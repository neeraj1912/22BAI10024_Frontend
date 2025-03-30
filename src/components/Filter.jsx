import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import search from "../assets/search.svg";
export default function Filter({ allFilters, onFilter }) {
  const location = useLocation();

  // Extract the query string
  const queryParams = new URLSearchParams(location.search);

  // Get the value after 'q='
  const searchQuery = queryParams.get("q");

  console.log(searchQuery);
  console.log(allFilters);
  const [filters, setFilters] = useState({
    counties: "",
    status: ["all"],
    owners: [],
    attorneys: [],
    law_firms: [],
    classes: [],
  });

  // If filters are updated, call the onFilter function
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    let baseURL = "search?q=" + searchQuery + "&";
    const encodeValue = (value) =>
      encodeURIComponent(value).replace(/%20/g, "+");

    if (filters.counties.length > 0) {
      baseURL += `counties=${encodeValue(filters.counties)}&`;
    }
    if (filters.status.length > 0 && !filters.status.includes("all")) {
      filters.status.forEach((status) => {
        baseURL += `status=${encodeValue(status)}&`;
      });
    }
    if (filters.owners.length > 0) {
      filters.owners.forEach((owner) => {
        baseURL += `owners=${encodeValue(owner)}&`;
      });
    }
    if (filters.attorneys.length > 0) {
      filters.attorneys.forEach((attorney) => {
        baseURL += `attorneys=${encodeValue(attorney)}&`;
      });
    }
    if (filters.law_firms.length > 0) {
      filters.law_firms.forEach((lawFirm) => {
        baseURL += `law_firms=${encodeValue(lawFirm)}&`;
      });
    }
    if (filters.classes.length > 0) {
      filters.classes.forEach((classCode) => {
        baseURL += `classes=${encodeValue(classCode)}&`;
      });
    }

    // Remove the trailing '&' if it exists
    if (baseURL.endsWith("&")) {
      baseURL = baseURL.slice(0, -1);
    }

    // Update the URL in the browser
    if (baseURL !== "search?q=") {
      window.history.pushState({}, "", baseURL);
      onFilter(filters);
    }
  }, [filters]);

  const [searchQueries, setSearchQueries] = useState({
    owners: "",
    attorneys: "",
    law_firms: "",
    classes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleTabChange = (status) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: [status],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const isChecked = e.target.checked;

    setFilters((prevFilters) => {
      if (isChecked) {
        return {
          ...prevFilters,
          [name]: [...prevFilters[name], value],
        };
      } else {
        return {
          ...prevFilters,
          [name]: prevFilters[name].filter((item) => item !== value),
        };
      }
    });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQueries((prevQueries) => ({
      ...prevQueries,
      [name]: value,
    }));
  };

  if (!allFilters) {
    return <div>Loading...</div>;
  }

  const filterItems = (items, query) => {
    if (!Array.isArray(items) || typeof query !== "string") {
      return [];
    }
    return items.filter((item) =>
      item.key.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredOwners = filterItems(allFilters.owners, searchQueries.owners);
  const filteredAttorneys = filterItems(
    allFilters.attorneys,
    searchQueries.attorneys
  );
  const filteredlaw_firms = filterItems(
    allFilters.law_firms,
    searchQueries.law_firms
  );
  const filteredClasses = filterItems(
    allFilters.classes,
    searchQueries.classes
  );

  return (
    <div className='filter-container p-4 border rounded-xl mr-14 -mt-14 flex-1 transition-all duration-500 rounded-l-2xl md:rounded-r-2xl block'>
      {/* counties Select */}
      <div className='mb-4 border rounded-xl p-4 flex gap-4 items-center'>
        <label className='block text-sm font-medium mb-2'>Country</label>
        <select
          name='counties'
          value={filters.counties}
          onChange={handleInputChange}
          multiple={false}
          className='border rounded-md p-2 w-full'>
          <option value=''>Select counties</option>
          {allFilters.counties.map((country, index) =>
            country && country.key && country.key.length > 0 ? (
              <option key={country.key} value={country.key}>
                {country.key}
              </option>
            ) : null
          )}
        </select>
      </div>
      {/* Status Select */}
      <div className='mb-4 border rounded-xl p-4'>
        <label className='block text-sm font-medium mb-2'>Status</label>
        <div className='flex gap-3 flex-wrap'>
          <button
            onClick={() => handleTabChange("all")}
            className={`text-sm rounded-md px-3 text-center py-0 font-medium  w-fit flex items-center gap-1 ${
              filters.status.includes("all")
                ? "btn-primary-filter-selected"
                : "btn-primary-filter"
            }`}>
            {" "}
            All
          </button>
          <button
            onClick={() => handleTabChange("registered")}
            className={`text-sm rounded-md px-3 text-center py-0 font-medium  w-fit flex items-center gap-1 ${
              filters.status.includes("registered")
                ? "btn-primary-filter-selected"
                : "btn-primary-filter"
            }`}>
            <span className='text-4xl -mt-1' style={{ color: "#128807" }}>
              •
            </span>{" "}
            Registered
          </button>
          <button
            onClick={() => handleTabChange("pending")}
            className={`text-sm rounded-md px-3 text-center py-0 font-medium  w-fit flex items-center gap-1 ${
              filters.status.includes("pending")
                ? "btn-primary-filter-selected"
                : "btn-primary-filter"
            }`}>
            <span className='text-4xl -mt-1' style={{ color: "#edab2c" }}>
              •
            </span>{" "}
            Pending
          </button>
          <button
            onClick={() => handleTabChange("abandoned")}
            className={`text-sm rounded-md px-3 text-center py-0 font-medium  w-fit flex items-center gap-1 ${
              filters.status.includes("abandoned")
                ? "btn-primary-filter-selected"
                : "btn-primary-filter"
            }`}>
            <span
              className='text-4xl -mt-1'
              style={{ color: "rgb(232, 82, 82)" }}>
              •
            </span>{" "}
            Abandoned
          </button>
          <button
            onClick={() => handleTabChange("others")}
            className={`text-sm rounded-md px-3 text-center py-0 font-medium  w-fit flex items-center gap-1 ${
              filters.status.includes("others")
                ? "btn-primary-filter-selected"
                : "btn-primary-filter"
            }`}>
            <span className='text-4xl -mt-1' style={{ color: "#3498db" }}>
              •
            </span>{" "}
            Others
          </button>
        </div>
      </div>
      {/* Owners MultiSelect */}
      <div className='mb-4 border rounded-xl p-4'>
        <label className='block text-sm font-medium mb-2'>Owners</label>
        {allFilters.owners.length > 4 && (
          <div className='relative'>
            <img
              src={search}
              alt='Search'
              className='absolute left-3 top-5 transform -translate-y-1/2'
            />
            <input
              type='text'
              placeholder='Search'
              name='owners'
              value={searchQueries.owners}
              onChange={handleSearchChange}
              className='border rounded-md p-2 pl-10 w-full mb-4'
            />
          </div>
        )}
        <div className='max-h-[200px] overflow-y-auto'>
          {filteredOwners.map((owner, index) => (
            <div key={owner.key} className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='owners'
                value={owner.key}
                onChange={handleCheckboxChange}
              />
              <label className='capitalize text-base'>
                {owner.key} ({owner.doc_count})
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Class Codes MultiSelect */}
      <div className='mb-4 border rounded-xl p-4'>
        <label className='block text-sm font-medium mb-2'>Categories</label>
        {allFilters.classes.length > 4 && (
          <div className='relative'>
            <img
              src={search}
              alt='Search'
              className='absolute left-3 top-5 transform -translate-y-1/2'
            />
            <input
              type='text'
              placeholder='Search'
              name='classes'
              value={searchQueries.classes}
              onChange={handleSearchChange}
              className='border rounded-md p-2 pl-10 w-full mb-4'
            />
          </div>
        )}
        <div className='max-h-[200px] overflow-y-auto'>
          {filteredClasses.map((codes, index) => (
            <div key={codes.key} className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='classes'
                value={codes.key}
                onChange={handleCheckboxChange}
              />
              <label className='capitalize text-base'>
                Class {parseInt(codes.key)} ({codes.doc_count})
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Attorneys MultiSelect */}
      <div className='mb-4 border rounded-xl p-4'>
        <label className='block text-sm font-medium mb-2'>Attorneys</label>
        {allFilters.attorneys.length > 4 && (
          <div className='relative'>
            <img
              src={search}
              alt='Search'
              className='absolute left-3 top-5 transform -translate-y-1/2'
            />
            <input
              type='text'
              placeholder='Search'
              name='attorneys'
              value={searchQueries.attorneys}
              onChange={handleSearchChange}
              className='border rounded-md p-2 pl-10 w-full mb-4'
            />
          </div>
        )}
        <div className='max-h-[200px] overflow-y-auto'>
          {filteredAttorneys.map((attorney, index) => (
            <div key={attorney.key} className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='attorneys'
                value={attorney.key}
                onChange={handleCheckboxChange}
              />
              <label className='capitalize text-base'>
                {attorney.key} ({attorney.doc_count})
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Law Firms MultiSelect */}
      <div className='mb-4 border rounded-xl p-4'>
        <label className='block text-sm font-medium mb-2'>Law Firms</label>
        {allFilters.law_firms.length > 4 && (
          <div className='relative'>
            <img
              src={search}
              alt='Search'
              className='absolute left-3 top-5 transform -translate-y-1/2'
            />
            <input
              type='text'
              placeholder='Search'
              name='law_firms'
              value={searchQueries.law_firms}
              onChange={handleSearchChange}
              className='border rounded-md p-2 pl-10 w-full mb-4'
            />
          </div>
        )}
        <div className='max-h-[200px] overflow-y-auto'>
          {filteredlaw_firms.map((lawFirm, index) => (
            <div key={lawFirm.key} className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='law_firms'
                value={lawFirm.key}
                onChange={handleCheckboxChange}
              />
              <label className='capitalize text-base'>
                {lawFirm.key} ({lawFirm.doc_count})
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
