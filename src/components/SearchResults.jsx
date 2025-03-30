"use client";
import { useState } from "react";
import renew from "../assets/renew.svg";

const dateFormater = (timestamp) => {
  const ts = parseInt(timestamp);
  const dateObj = new Date(ts * 1000); 
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return dateObj.toLocaleDateString("en-GB", options).replace(/ /g, " ");
};

const statusProvider = (status) => {
  switch (status.toLowerCase()) {
    case "registered":
      return (
        <div className='flex items-center'>
          <span className='text-4xl mr-1' style={{ color: "#41b65c" }}>
            •
          </span>
          <p style={{ color: "#41b65c" }}>Live/Registered</p>
        </div>
      );
    case "pending":
      return (
        <div className='flex items-center'>
          <span className='text-4xl -mt-2 mr-1' style={{ color: "#EDAB2C" }}>
            •
          </span>
          <p style={{ color: "#EDAB2C" }}> Live/Pending</p>
        </div>
      );
    case "abandoned":
      return (
        <div className='flex items-center'>
          <span className='text-4xl -mt-2 mr-1' style={{ color: "#E85252" }}>
            •
          </span>
          <p style={{ color: "#E85252" }}> Dead/Abandoned</p>
        </div>
      );
    case "others":
      return (
        <div className='flex items-center'>
          <span className='text-4xl -mt-2 mr-1' style={{ color: "#3498DB" }}>
            •
          </span>
          <p style={{ color: "#3498DB" }}>Dead/Expired</p>
        </div>
      );
  }
};

export default function SearchResults({ results }) {
  return (
    <div className='space-y-4 mx-[4%]'>
      <table className='w-full'>
        <thead>
          <tr
            style={{
              borderBottom: "1px solid #e5e7eb",
            }}>
            <th className='w-1/6 py-2 text-left pl-4 pb-2 font-medium'>Mark</th>
            <th className='w-1/3 px-4 py-2 text-left pb-2 font-medium pl-16'>
              Details
            </th>
            <th className='w-1/4 px-4 py-2 text-left  pb-2 font-medium'>
              Status
            </th>
            <th className='w-1/3 px-4 py-2 text-left pb-2 font-medium'>
              Class/Description
            </th>
            <th className='w-1/3 px-4 py-2 text-left pb-2 font-medium'> </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr
              key={result.id}
              className='border-none hover:bg-[#F4F4F4] transition-colors duration-300'>
              
              <td className='w-1/5 py-2 pl-5 rounded-tl-xl rounded-bl-xl'>
                <div className='h-24 w-33 flex items-center justify-center rounded-lg img-shadow'>
                 
                  <span className=' '>No Image</span>
                </div>
              </td>
             
              <td className='w-1/3 px-4 py-2 pl-16'>
                <h3 className='text-lg font-semibold'>
                  {result.mark_identification}
                </h3>
                <p className='text-sm  '>{result.current_owner}</p>
                <br />
                <p className='text-sm font-bold '>{result.id}</p>
                <p className='text-sm text-gray-500'>
                  {dateFormater(result.registration_date)}
                </p>
              </td>
              
              <td className='w-1/4 px-4 py-2'>
                <div className='flex items-center'>
                  <span className='flex-1 leading-6 font-bold text-base'>
                    {statusProvider(result.status)}
                  </span>
                </div>
                <p className='text-xs '>
                  on <b>{dateFormater(result.renewal_date)}</b>
                </p>
                <br />
                <p className='text-xs flex items-center gap-1'>
                  <span>
                    <img src={renew} alt='' />
                  </span>{" "}
                  <b>{dateFormater(result.status_date)}</b>
                </p>
              </td>
              
              <td className='w-1/3 px-4 py-2'>
                <p className='text-sm text-gray-700 line-clamp-2 '>
                  {result.mark_description.join(", ")}
                </p>
                <div className='mt-2 flex items-center'>
                  {result.class_codes.map((code, idx) => (
                    <span
                      key={idx}
                      className='text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded-full mr-2'>
                      Class {code}
                    </span>
                  ))}
                  
                </div>
              </td>
              
              <td className='w-1/3 px-4 py-2 rounded-tr-xl rounded-br-xl'>
                <div className='flex items-center space-x-4'>
                  <button
                    className='text-sm hover:underline rounded-full'
                    style={{
                      backgroundColor: "#F9FAFB",
                    }}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='h-10 w-10 text-gray-500 p-2'>
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
