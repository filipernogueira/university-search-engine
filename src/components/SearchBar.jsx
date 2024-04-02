import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('Search term:', searchTerm);
    }
  };

  return (
    <div className='flex items-center'>
      <input
        placeholder='Search'
        className='w-80 h-10 border border-gray-500 rounded-full bg-gray-200 indent-3'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div className="cursor-pointer">
        <IoMdSearch className='w-9 h-9 ml-1' />
      </div>
    </div>
  );
}

export default SearchBar;