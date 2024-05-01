import { useState, useEffect } from 'react';
import { SearchBar, Filters } from "../components";
import { useNavigate } from 'react-router-dom';
import logo from "../utils/university.png"


const MainPage = ({ query, setQuery }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (query !== "") {
      navigate("/results")
    }
  }, [query]);

  return (
    <div className='flex flex-col h-screen w-screen items-center pt-14 bg-white'>
      <div className='flex'>
        <h1 className='text-3xl mb-20'>University's Search Engine</h1>
        <img className='w-10 h-10 items-center justify-center ml-3' src={logo} alt="logo" />
      </div>
      <SearchBar setQuery={setQuery} />
      <button
        className='bg-gray-200 w-1/6 rounded-lg mt-5 mb-8'
        onClick={() => navigate("/ranking")}
      >
        Rankings
      </button>

      <Filters />
    </div>
  )
}

export default MainPage