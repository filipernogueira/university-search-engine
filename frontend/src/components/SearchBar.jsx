import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ query, setQuery }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (query !== "") setSearchTerm(query);
    }, [query]);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setQuery(searchTerm);
            setSearchTerm("");
        }
    };

    return (
        <div className="flex w-1/2 justify-center items-center">
            <input
                placeholder="Search"
                className="w-full h-12 border border-gray-500 rounded-full bg-gray-200 indent-5 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <div onClick={handleKeyPress}>
                <IoMdSearch className="w-9 h-9 ml-1" />
            </div>
        </div>
    );
};

export default SearchBar;
