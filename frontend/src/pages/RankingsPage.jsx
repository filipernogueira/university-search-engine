import { RankingTable } from "../components";
import { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../components";

const subjects = [
    "World",
    "Computer Science",
    "Engineering",
    "Mathematics",
    "Medicine",
    "Business Management and Accounting",
    "Social Sciences",
    "Law",
    "Communication",
];

const RankingsPage = () => {
    const [rankingType, setRankingType] = useState("");

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center bg-background min-h-screen">
            <div className="w-full flex items-center justify-center my-8">
                <IoChevronBackCircleOutline
                    onClick={() => navigate("/")}
                    className="w-9 h-9 cursor-pointer absolute left-5"
                />
                <h1 className="text-3xl">Rankings Page</h1>
                <div></div>
            </div>
            <Dropdown
                label="Subject"
                options={subjects}
                value={rankingType}
                setValue={setRankingType}
            />
            {rankingType !== "" && <RankingTable type={rankingType} />}
        </div>
    );
};

export default RankingsPage;
