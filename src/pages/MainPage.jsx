import { useEffect } from "react";
import { SearchBar, Filters } from "../components";
import { useNavigate } from "react-router-dom";
import logo from "../utils/university.png";
import { Button } from "@material-tailwind/react";

const MainPage = ({
    query,
    setQuery,
    country,
    setCountry,
    name,
    setName,
    setsearchArgs,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (query !== "") navigate("/results");
    }, [query]);

    return (
        <div className="flex flex-col h-screen w-screen items-center py-12 bg-background">
            <div className="flex">
                <h1 className="text-3xl mb-16">University's Search Engine</h1>
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
                    setsearchArgs={setsearchArgs}
                />
            </div>

            <div className="flex flex-col justify-center items-center w-full mt-16">
                <h2 className="text-lg mb-4">General Search</h2>
                <SearchBar query={query} setQuery={setQuery} />
            </div>

            <Button
                onClick={() => navigate("/ranking")}
                variant="gradient"
                className="flex items-center gap-3 mt-auto"
            >
                <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                        d="M32 160v296a8 8 0 008 8h136V160a16 16 0 00-16-16H48a16 16 0 00-16 16zM320 48H192a16 16 0 00-16 16v400h160V64a16 16 0 00-16-16zM464 208H352a16 16 0 00-16 16v240h136a8 8 0 008-8V224a16 16 0 00-16-16z"
                    />
                </svg>
                Rankings
            </Button>
        </div>
    );
};

export default MainPage;
