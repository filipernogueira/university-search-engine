import { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";

const ResultsPage = ({ query, setQuery }) => {
    const [results, setResults] = useState(null);
    const [areResultsReady, setAreResultsReady] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:5000/searchResults",
                    { query }
                );
                console.log(response.data);
                setResults(response.data);
                setAreResultsReady(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        setAreResultsReady(false);
        fetchData();
    }, [query]);

    return (
        <div className="flex flex-col p-8 align-center bg-background min-h-screen">
            <div className="flex">
                <IoChevronBackCircleOutline
                    onClick={() => {
                        setQuery("");
                        navigate("/");
                    }}
                    className="w-9 h-9 cursor-pointer"
                />
                <h1 className="ml-5 text-2xl">Results</h1>
            </div>

            <div className="my-8">
                <SearchBar query={query} setQuery={setQuery} />
            </div>

            {areResultsReady &&
                results &&
                results.length !== 0 &&
                results.map((result, idx) => (
                    <div className="mb-8 w-1/2" key={idx}>
                        <a
                            href={result.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-lg font-bold"
                        >
                            {result.title}
                        </a>
                        <p className="text-md">{result.description}</p>
                    </div>
                ))}
            {areResultsReady && results && results.length === 0 && (
                <div className="flex flex-col">
                    <span>No Results...</span>
                    <span>
                        Try to input a University / Degrees related query.
                    </span>
                </div>
            )}
            {!areResultsReady && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner className="h-12 w-12" />
                </div>
            )}
        </div>
    );
};

export default ResultsPage;
