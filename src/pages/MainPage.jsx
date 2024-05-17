import { useEffect } from "react";
import { SearchBar, Filters, ActionButton } from "../components";
import { useNavigate } from "react-router-dom";
import logo from "../utils/university.png";
import { ranking } from "../utils/logosSVG";

const MainPage = ({
    query,
    setQuery,
    country,
    setCountry,
    name,
    setName,
    setIsListSearchReady,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (query !== "") navigate("/results");
    }, [query]);

    return (
        <div className="flex flex-col h-screen w-screen items-center py-12 bg-background">
            <div className="flex mb-16">
                <h1 className="text-3xl">University's Search Engine</h1>
                <img
                    className="w-10 h-10 items-center justify-center ml-3"
                    src={logo}
                    alt="logo"
                />
            </div>

            <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg mb-4">University Search</h2>
                <Filters
                    country={country}
                    setCountry={setCountry}
                    name={name}
                    setName={setName}
                    setIsListSearchReady={setIsListSearchReady}
                />
            </div>

            <div className="flex flex-col justify-center items-center w-full mt-16">
                <h2 className="text-lg mb-4">General Search</h2>
                <SearchBar query={query} setQuery={setQuery} />
            </div>

            <div className="mt-auto">
                <ActionButton
                    logo={ranking}
                    text="Rankings"
                    onClick={() => navigate("/ranking")}
                />
            </div>
        </div>
    );
};

export default MainPage;
