import { useState } from 'react';
import SearchBar from "../components/SearchBar";

const MainPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div className='flex flex-col h-screen w-screen items-center pt-14'>
      <h1 className='text-3xl mb-20'>University's Search Engine</h1>
      <SearchBar setQuery={setQuery} />
    </div>
  )
}

export default MainPage