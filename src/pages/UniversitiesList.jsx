import { UniversityCard, Filters } from "../components";
import { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { url } from "../backendUrl.js";
import axios from "axios";

const UniversitiesList = ({
    country,
    setCountry,
    name,
    setName,
    isListSearchReady,
    setIsListSearchReady,
}) => {
    const [universities, setUniversities] = useState([]);
    const [areResultsReady, setAreResultsReady] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const search = async () => {
            try {
                const response = await axios.post(`${url}/universityList`, {
                    country,
                    name,
                });

                console.log(response.data);
                setUniversities(response.data);
                setAreResultsReady(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        setAreResultsReady(false);
        search();
    }, [isListSearchReady]);

    return (
        <div className="flex flex-col p-10 items-start bg-background min-h-screen">
            <div className="flex mb-8">
                <IoChevronBackCircleOutline
                    onClick={() => navigate("/")}
                    className="w-9 h-9 cursor-pointer"
                />
                <h1 className="ml-5 text-2xl">Universities</h1>
                <div></div>
            </div>

            <div className="mb-6">
                <Filters
                    country={country}
                    setCountry={setCountry}
                    name={name}
                    setName={setName}
                    setIsListSearchReady={setIsListSearchReady}
                />
            </div>

            {areResultsReady &&
                (universities.length > 0 ? (
                    <div className="grid grid-cols-3 gap-10 mx-auto">
                        {universities.map((uni, idx) => (
                            <div key={idx}>
                                <UniversityCard university={uni} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center mt-10 ml-3 text-xl">
                        <span>No results...</span>
                    </div>
                ))}

            {!areResultsReady && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner className="h-12 w-12" />
                </div>
            )}
        </div>
    );
};

export default UniversitiesList;
