import React from "react";
function generateCombinations(inp) {
  const maxCombinations = 5;
  const combinations = [];
  const words = inp.split(" "); // Split the input into words

  // Add each word with '*' at the end
  words.forEach((word) => {
    combinations.push(`${word}*`);
  });

  // Add each word with '*' at the start
  words.forEach((word) => {
    combinations.push(`*${word}`);
  });

  // Ensure no more than 5 combinations are returned
  return combinations.slice(0, maxCombinations);
}
const SearchHeader = ({ query, showFilters, setShowFilters, totalHits }) => {
  return (
    <div>
      <div className='flex items-center justify-between px-[4%] py-4 relative z-10 border-b border-b-2'>
        <div className='w-full flex items-center justify-between flex-wrap'>
          <p
            className='mr-auto my-2 font-bold text-l'
            style={{ color: "#4b5563" }}>
            About {totalHits} Trademarks found for “{query}”
          </p>

          <div
            onClick={() => setShowFilters(!showFilters)}
            className={`flex border mr-5 p-2 items-center self-stretch px-3 rounded-xl cursor-pointer justify-center border-tm-blue text-tm-blue bg-tm-quoting-blue ${
              showFilters ? "border-cyan-600" : ""
            }`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='#4380EC'
              aria-hidden='true'
              className='w-5 h-5'
              stroke-width='0'>
              <path
                fill-rule='evenodd'
                d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
                clip-rule='evenodd'></path>
            </svg>
            <p className='ml-2 flex-1'>Filters</p>
          </div>
          <div className='flex items-center'>
            <button>
              <div
                className='rounded-full border cursor-pointer flex items-center justify-center ml-3 fill-[#3A3A3A] stroke-[#3A3A3A]'
                style={{ width: "40px", height: "40px" }}>
                <svg
                  width='19'
                  height='19'
                  viewBox='0 0 17 19'
                  xmlns='http://www.w3.org/2000/svg'
                  stroke='none'>
                  <path
                    d='M13.5165 13.0687C12.7675 13.0687 12.1018 13.3494 11.5817 13.7906L5.96408 10.8024C6.13055 10.4415 6.2346 10.0604 6.2346 9.65925C6.2346 9.23802 6.13054 8.85713 5.96408 8.51606L11.8105 5.36739C12.289 5.70831 12.8716 5.90891 13.5167 5.90891C15.1188 5.90891 16.4087 4.66555 16.4087 3.1213C16.4085 1.57734 15.1186 0.333984 13.5165 0.333984C11.9144 0.333984 10.6245 1.57734 10.6245 3.12159C10.6245 3.68312 10.791 4.18449 11.0822 4.62569L5.36064 7.65392C4.84049 7.15255 4.11221 6.8518 3.3217 6.8518C1.71961 6.8518 0.429688 8.09516 0.429688 9.63941C0.429688 11.1837 1.71961 12.427 3.3217 12.427C4.11236 12.427 4.84049 12.1262 5.36064 11.6249L10.9366 14.593C10.7285 14.974 10.6037 15.4152 10.6037 15.8765C10.6037 17.4207 11.8936 18.6641 13.4957 18.6641C15.0978 18.6641 16.3877 17.4207 16.3877 15.8765C16.4086 14.3122 15.0979 13.0687 13.5166 13.0687L13.5165 13.0687Z'
                    fill='inherit'></path>
                </svg>
              </div>
            </button>
            <div>
              <div>
                <div
                  className='rounded-full border cursor-pointer flex items-center justify-center ml-3 fill-[#3A3A3A] stroke-[#3A3A3A]'
                  style={{ width: "40px", height: "40px" }}>
                  <svg
                    width='18'
                    height='19'
                    viewBox='0 0 18 19'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M6.76553 0.697266C6.62113 0.697493 6.4826 0.750956 6.38032 0.845847C6.27804 0.940739 6.22042 1.06946 6.21981 1.20384V2.48794H4.28778C4.12093 1.59871 3.28617 0.914714 2.28421 0.914714C1.16337 0.914714 0.242188 1.76841 0.242188 2.81074C0.242188 3.67509 0.87968 4.40381 1.73531 4.63026V7.80854C0.87968 8.03419 0.242188 8.75983 0.242188 9.62407C0.242188 10.4884 0.879555 11.2182 1.73531 11.4446V14.3694C0.87968 14.5959 0.242188 15.3246 0.242188 16.1889C0.242188 17.2313 1.16334 18.0849 2.28421 18.0849C3.21502 18.0849 3.9974 17.4931 4.23872 16.6964H6.21981V17.7919C6.2192 17.9269 6.27645 18.0567 6.37885 18.1524C6.48126 18.2482 6.62028 18.3022 6.76553 18.3024H16.7266C16.8725 18.303 17.0124 18.2493 17.1155 18.1535C17.2185 18.0576 17.2761 17.9275 17.2756 17.7919V14.583C17.2761 14.4475 17.2185 14.3173 17.1155 14.2215C17.0124 14.1257 16.8725 14.072 16.7266 14.0726H6.76553C6.62028 14.0728 6.48126 14.1269 6.37885 14.2225C6.27645 14.3183 6.2192 14.4481 6.21981 14.583V15.6785H4.23759C4.04462 15.0454 3.51049 14.5475 2.8299 14.3685V11.4457C3.51086 11.2667 4.04487 10.7682 4.23759 10.1347H6.21981V11.2312C6.2192 11.3663 6.27645 11.4959 6.37885 11.5917C6.48126 11.6875 6.62028 11.7414 6.76553 11.7416H16.7266C16.8725 11.7422 17.0124 11.6886 17.1155 11.5927C17.2185 11.4969 17.2761 11.3667 17.2756 11.2312V8.02117C17.2761 7.88564 17.2185 7.75545 17.1155 7.65966C17.0124 7.56374 16.8725 7.51017 16.7266 7.51063H6.76553C6.62028 7.51097 6.48126 7.56488 6.37885 7.66068C6.27645 7.75648 6.2192 7.88611 6.21981 8.02117V9.11764H4.23872C4.04672 8.48337 3.51199 7.98517 2.82994 7.80664V4.63132C3.44387 4.46991 3.94213 4.0513 4.1756 3.50498H6.21981V4.41769C6.2192 4.55276 6.27645 4.6825 6.37885 4.77818C6.48126 4.87398 6.62028 4.92801 6.76553 4.92824H16.7266C16.8725 4.92881 17.0124 4.87512 17.1155 4.77932C17.2185 4.6834 17.2761 4.55332 17.2756 4.41769V1.20389C17.275 1.06893 17.2169 0.939875 17.1139 0.844882C17.011 0.749878 16.8717 0.696754 16.7266 0.697324L6.76553 0.697266ZM7.31453 1.71429H16.182V3.91019H7.31453V1.71429ZM2.28445 1.93177C2.81418 1.93177 3.22966 2.31804 3.22966 2.81077C3.22966 3.30339 2.8143 3.69274 2.28445 3.69274C1.75473 3.69274 1.33606 3.30342 1.33606 2.81077C1.33606 2.31812 1.7547 1.93177 2.28445 1.93177ZM7.31453 8.52877H16.182V10.7247H7.31453V8.52877ZM2.28414 8.74625C2.81387 8.74625 3.22935 9.13161 3.22935 9.62423C3.22935 10.1006 2.83999 10.4776 2.33542 10.5022C2.31589 10.5003 2.29636 10.4993 2.27671 10.4993C2.26206 10.4994 2.24742 10.5001 2.23289 10.5013C1.72832 10.4764 1.33577 10.1005 1.33577 9.62422C1.33577 9.13161 1.75439 8.74625 2.28414 8.74625ZM7.31422 15.0895L16.182 15.0897V17.2855H7.31453L7.31422 15.0895ZM2.28414 15.307C2.81387 15.307 3.22935 15.6963 3.22935 16.189C3.22935 16.6816 2.81399 17.068 2.28414 17.068C1.75442 17.068 1.33575 16.6817 1.33575 16.189C1.33575 16.1273 1.34246 16.068 1.35503 16.0102C1.44242 15.6057 1.82057 15.307 2.28414 15.307Z'
                      stroke-width='0.188861'></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='px-[4%] py-4 flex items-center'>
        <span>Also try searching for:</span>
        {generateCombinations(query).map((item, index) => (
          <p
            key={index}
            style={{
              color: "#e7760d",
              backgroundColor: "#fff7f0",
              border: "0.8px solid #e7760d",
              marginLeft: "10px",
              fontWeight: "400",
            }}
            className='m-1 w-fit border border-tm-orange bg-tm-orange-light cursor-pointer text-tm-orange px-2 rounded-xl py-1'>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchHeader;
