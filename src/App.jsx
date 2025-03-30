import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import StatusIndicator from "./components/StatusIndicator";
import SearchResults from "./components/SearchResults";
import SearchHeader from "./components/SearchHeader";

import "./fonts/Gilroy-Regular.woff";
import "./fonts/Gilroy-Bold.woff";
import "./fonts/Gilroy-Medium.woff";
import logo from "./assets/logo.svg";

export default function App() {
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [query, setQuery] = useState("");
  const [totalHits, setTotalHits] = useState(0);
  const [payload, setPayload] = useState({
    input_query: "",
    input_query_type: "",
    sort_by: "default",
    status: [],
    exact_match: false,
    date_query: false,
    owners: [],
    attorneys: [],
    law_firms: [],
    mark_description_description: [],
    classes: [],
    page: 1,
    rows: 10,
    sort_order: "desc",
    states: [],
    counties: [],
  });

  const [allFilters, setAllFilters] = useState({
    owners: [],
    attorneys: [],
    law_firms: [],
    classes: [],
    counties: [],
  });

  const location = useLocation();

  // Function to extract query params from URL
  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    const filters = {
      q: params.get("q") || "",
      status: params.get("status") || "",
      owners: params.getAll("owners") || [],
      attorneys: params.getAll("attorneys") || [],
      law_firms: params.getAll("law_firms") || [],
      classes: params.getAll("classes") || [],
    };
    return filters;
  };

  // Set filters from the URL when the component loads
  useEffect(() => {
    const filters = getQueryParams(location.search);

    setQuery(filters.q);
    setPayload({
      ...payload,
      input_query: filters.q,
      status: filters.status ? [filters.status] : [],
      owners: filters.owners,
      attorneys: filters.attorneys,
      law_firms: filters.law_firms,
      classes: filters.classes,
    });

    const newPayload = {
      ...payload,
      input_query: filters.q,
      status: filters.status ? [filters.status] : [],
      owners: filters.owners,
      attorneys: filters.attorneys,
      law_firms: filters.law_firms,
      classes: filters.classes,
    };

    fetchData(newPayload);
  }, []);

  const fetchData = async (payloadData) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStatus("loading");
    setResults([]);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://vit-tm-task.api.trademarkia.app/api/v3/us",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        origin: "http://localhost:3001",
        priority: "u=1, i",
        referer: "http://localhost:3001/",
      },
      data: JSON.stringify(payloadData),
    };

    try {
      const response = await axios.request(config);
      const data = response.data;

      if (data.body.hits.length === 0) {
        setStatus("no-results");
      } else {
        const results = data.body.hits.hits.map((hit) => ({
          mark_identification: hit._source.mark_identification,
          current_owner: hit._source.current_owner,
          id: hit._id,
          registration_date: hit._source.registration_date,
          status: hit._source.status_type,
          status_date: hit._source.status_date,
          renewal_date: hit._source.renewal_date,
          mark_description: hit._source.mark_description_description,
          class_codes: hit._source.class_codes,
          owners: hit._source.current_owner_cleaned,
          attorneys: hit._source.attorney_name_cleaned,
          law_firms: hit._source.law_firm_cleaned,
        }));

        setTotalHits(data.body.hits.total.value);
        setResults(results);
        setStatus("idle");
      }

      if (data.body.aggregations) {
        const { attorneys, class_codes, country, current_owners, law_firms } =
          data.body.aggregations;

        setAllFilters({
          ...allFilters,
          attorneys: attorneys.buckets,
          classes: class_codes.buckets,
          counties: country.buckets,
          owners: current_owners.buckets,
          law_firms: law_firms.buckets,
        });
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleSearch = async (q) => {
    setQuery(q);
    setPayload({
      ...payload,
      input_query: q,
    });

    const newPayload = {
      ...payload,
      input_query: q,
    };

    fetchData(newPayload);
  };

  const handleFilter = (filters) => {
    if (filters?.counties == "") {
      filters.counties = [];
    } else {
      filters.counties = [filters.counties];
    }
    const updatedPayload = {
      ...payload,
      ...filters,
    };

    setPayload(updatedPayload);
    fetchData(updatedPayload);
  };

  return (
    <div className=''>
      <div
        className='flex p-6 py-6 pl-[6%]'
        style={{
          backgroundColor: "#F8FAFE",
        }}>
        <img src={logo} alt='logo' width={200} />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <SearchHeader
          totalHits={totalHits}
          query={query}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        <div className='result-container w-full flex'>
          <div className='result-table w-[75%]'>
            <StatusIndicator status={status} />

            {results?.length > 0 && (
              <>
                <SearchResults results={results} />
                {/* PAGEITION */}
                <div className='flex justify-center items-center mt-5 space-x-4'>
                  <button
                    className='bg-[#4380EC] text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-[#4380EC] hover:scale-105 active:bg-[#4380EC] disabled:bg-gray-400 disabled:cursor-not-allowed'
                    disabled={payload.page === 1}
                    onClick={() => {
                      setPayload({
                        ...payload,
                        page: payload.page - 1,
                      });
                      fetchData(payload);
                    }}>
                    Previous
                  </button>
                  <button
                    className='bg-[#4380EC] text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-[#4380EC] hover:scale-105 active:bg-[#4380EC]'
                    onClick={() => {
                      setPayload({
                        ...payload,
                        page: payload.page + 1,
                      });
                      fetchData(payload);
                    }}>
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
          <div className='result-filters w-[25%]'>
            {showFilters && (
              <Filter allFilters={allFilters} onFilter={handleFilter} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
