import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ setQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setQuery(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className='flex w-full items-center justify-center'>
      <input
        placeholder='Search'
        className='w-1/2 h-12 border border-gray-500 rounded-full bg-gray-200 indent-5 focus:outline-none'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div className="cursor-pointer" onClick={handleKeyPress}>
        <IoMdSearch className='w-9 h-9 ml-1' />
      </div>
    </div>
  );
}

export default SearchBar;