import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { Button } from "@material-tailwind/react";

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
                className="w-full h-12 border border-gray-500 rounded-full bg-white indent-5 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            {/*<div onClick={handleKeyPress}>
                <IoMdSearch className="w-9 h-9 ml-1" />
    </div>*/}
            <Button
                onClick={() => {
                    setQuery(searchTerm);
                    setSearchTerm("");
                }}
                variant="gradient"
                className="flex items-center gap-3 ml-3"
            >
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
