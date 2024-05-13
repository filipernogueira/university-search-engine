import { UniversityCard, Filters } from "../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const UniversitiesList = ({
    country,
    setCountry,
    name,
    setName,
    searchArgs,
    setsearchArgs,
}) => {
    const [universities, setUniversities] = useState([]);
    const [areResultsReady, setAreResultsReady] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const search = async () => {
            try {
                let url = "http://universities.hipolabs.com/search?";

                for (let i = 0; i < searchArgs.length; i++) {
                    url += searchArgs[i];
                    if (i !== searchArgs.length - 1) url += "&";
                }
                const response = await axios.get(url);
                console.log(response.data);
                setUniversities(response.data.slice(0, 5000));
                setAreResultsReady(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        setAreResultsReady(false);
        search();
    }, [searchArgs]);

    return (
        <div className="flex flex-col p-8 align-center bg-background min-h-screen">
            <div className="flex mb-8">
                <IoChevronBackCircleOutline
                    onClick={() => navigate("/")}
                    className="w-9 h-9 cursor-pointer ml-5"
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
                    setsearchArgs={setsearchArgs}
                />
            </div>

            {areResultsReady && (
                <div className="grid grid-cols-3 gap-10 mx-auto">
                    {universities.map((uni, idx) => (
                        <div key={idx}>
                            <UniversityCard university={uni} />
                        </div>
                    ))}
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

export default UniversitiesList;
