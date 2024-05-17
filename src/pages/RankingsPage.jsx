import { RankingTable, Dropdown, ActionButton } from "../components";
import { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "@material-tailwind/react";
import { url } from "../backendUrl.js";
import { searchLogo } from "../utils/logosSVG";
import axios from "axios";

const subjects = [
    "Computer Science",
    "Engineering",
    "Mathematics",
    "Medicine",
    "Business Management and Accounting",
    "Social Sciences",
    "Law",
    "Communication",
];

const countries = [
    "World",
    "China",
    "Ethiopia",
    "France",
    "Germany",
    "Ghana",
    "Indonesia",
    "Malaysia",
    "Mexico",
    "Norway",
    "Portugal",
    "Singapore",
    "Spain",
    "Sweden",
    "United Kingdom",
    "United States",
];

const RankingsPage = () => {
    const [subject, setSubject] = useState("");
    const [country, setCountry] = useState("");
    const [universities, setUniversities] = useState([]);
    const [areResultsReady, setAreResultsReady] = useState(null);

    const navigate = useNavigate();

    const search = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${url}/universityRanking`, {
                    subject,
                    country,
                });
                console.log(response.data);
                setUniversities(response.data);
                setAreResultsReady(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        setAreResultsReady(false);
        setUniversities([]);
        fetchData();
    };

    return (
        <div className="flex flex-col p-10 items-center bg-background min-h-screen">
            <div className="w-full flex items-center justify-between mb-8">
                <IoChevronBackCircleOutline
                    onClick={() => navigate("/")}
                    className="w-9 h-9 cursor-pointer"
                />
                <h1 className="text-3xl">Rankings Page</h1>
                <div className="w-9"></div>
            </div>
            <div className="flex">
                <Dropdown
                    label="Subject"
                    options={subjects}
                    value={subject}
                    setValue={setSubject}
                />
                <div className="mx-3">
                    <Dropdown
                        label="Country"
                        options={countries}
                        value={country}
                        setValue={setCountry}
                    />
                </div>

                <ActionButton
                    logo={searchLogo}
                    text="Search"
                    onClick={() => search()}
                />
            </div>
            {areResultsReady === true && universities.length !== 0 && (
                <RankingTable
                    universities={universities}
                    areResultsReady={areResultsReady}
                />
            )}
            {areResultsReady === true && universities.length === 0 && (
                <div className=" flex mt-24">
                    <span className="text-lg">Input Information.</span>
                </div>
            )}
            {areResultsReady === false && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner className="h-12 w-12" />
                </div>
            )}
        </div>
    );
};

export default RankingsPage;
