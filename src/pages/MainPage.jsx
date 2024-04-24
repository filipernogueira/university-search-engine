import { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar";
import { useNavigate } from 'react-router-dom';



const MainPage = ({ query, setQuery }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (query !== "") {
      navigate("/results")
    }
  }, [query]);

  return (
    <div className='flex flex-col h-screen w-screen items-center pt-14'>
      <h1 className='text-3xl mb-20'>University's Search Engine</h1>
      <SearchBar setQuery={setQuery} />
      <button
        className='bg-gray-200 w-1/6 rounded-lg mt-5'
        onClick={() => navigate("/ranking")}
      >
        World Ranking
      </button>
    </div>
  )
}

export default MainPage