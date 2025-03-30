import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  useEffect(() => {
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [query, navigate]);

  return (
    <form
      name='searchbar_form'
      role='search'
      className='no-ring flex-1 py-2 w-full px-5 md:max-w-[720px] ml-20'
      action=''
      data-hs-cf-bound='true'
      onSubmit={handleSearch}>
      <div className='flex items-center w-full relative justify-center h-full'>
        <div className='flex flex-1 border-[0.5px] bg-white p-2 pr-3 pl-4 rounded-[14px] items-center justify-between gap-x-2 max-h-[56px] border-gray-300 h-full'>
          <svg
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M18.9763 20.4554L15.038 16.5101M17.2205 11.2373C17.2205 13.2164 16.4343 15.1145 15.0348 16.514C13.6354 17.9134 11.7373 18.6996 9.75819 18.6996C7.77907 18.6996 5.881 17.9134 4.48155 16.514C3.0821 15.1145 2.2959 13.2164 2.2959 11.2373C2.2959 9.25819 3.0821 7.36013 4.48155 5.96068C5.881 4.56123 7.77907 3.77502 9.75819 3.77502C11.7373 3.77502 13.6354 4.56123 15.0348 5.96068C16.4343 7.36013 17.2205 9.25819 17.2205 11.2373V11.2373Z'
              stroke='#636363'
              strokeWidth='1.75583'
              strokeLinecap='round'
            />
          </svg>

          <input
            type='search'
            role='search'
            className='flex-1 border-0 text-tm-dark-gray placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base outline-none'
            placeholder='Search Trademark Here eg. Mickey Mouse'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          style={{ backgroundColor: "#4380EC" }}
          className='ml-3 py-6 px-8 md:py-3.5 md:px-8 font-bold items-center justify-center rounded-xl text-white'
          type='submit'>
          <span>Search</span>
        </button>
        <div></div>
      </div>
    </form>
  );
}
