import { useNavigate } from "react-router-dom";
import { Dropdown, ActionButton } from "../components";
import { searchLogo } from "../utils/logosSVG";

const countries = [
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

const Filters = ({
    country,
    setCountry,
    name,
    setName,
    setIsListSearchReady,
}) => {
    const navigate = useNavigate();

    const search = async () => {
        try {
            if (country !== "" || name !== "") {
                setIsListSearchReady((prev) => !prev);
                navigate("/universities");
            } else alert("Insert Information.");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Dropdown
                label="Country"
                options={countries}
                value={country}
                setValue={setCountry}
            />
            <input
                className="w-60 h-11 border border-gray-500 rounded-full bg-white indent-5 focus:outline-none mx-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="University Name"
            />

            <ActionButton
                logo={searchLogo}
                text="Search"
                onClick={() => search()}
            />
        </div>
    );
};

export default Filters;
