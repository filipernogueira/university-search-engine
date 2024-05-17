import { useState, useEffect } from "react";
import { ActionButton } from "../components";
import { searchLogo } from "../utils/logosSVG";

const SearchBar = ({ query, setQuery }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (query !== "") setSearchTerm(query);
    }, [query]);

    const search = () => {
        if (searchTerm !== "") {
            setQuery(searchTerm);
            setSearchTerm("");
        } else alert("Insert a query.");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") search();
    };

    return (
        <div className="flex justify-center items-center">
            <input
                placeholder="Search"
                className="w-96 h-11 border border-gray-500 rounded-full bg-white indent-5 focus:outline-none mr-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            <ActionButton
                logo={searchLogo}
                text="Search"
                onClick={() => search()}
            />
        </div>
    );
};

export default SearchBar;
