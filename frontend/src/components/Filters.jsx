import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../components";
import { Button } from "@material-tailwind/react";

const countries = [
    "Portugal",
    "Spain",
    "United Kingdom",
    "United States",
    "France",
    "Sweden",
    "Germany",
];

const Filters = ({ country, setCountry, name, setName, setsearchArgs }) => {
    const navigate = useNavigate();

    const search = async () => {
        try {
            let args = [];
            if (country !== "") args.push("country=" + country);
            if (name !== "") args.push("name=" + name);

            setsearchArgs(args);
            navigate("/universities");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex justify-center">
            <Dropdown
                label="Country"
                options={countries}
                value={country}
                setValue={setCountry}
            />
            <input
                className="w-60 border border-gray-500 rounded-full bg-gray-200 indent-5 focus:outline-none mx-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="University Name"
            />

            <Button
                onClick={() => search()}
                variant="gradient"
                className="flex items-center gap-3 mt-auto"
            >
                Submit
            </Button>
        </div>
    );
};

export default Filters;
