import { UniversityCard } from "../components"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const UniversitiesList = ({ searchArgs }) => {

    const [universities, setUniversities] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const search = async () => {
            try {
                let url = "http://universities.hipolabs.com/search?"
               
                for (let i = 0; i < searchArgs.length; i++) {
                    url += searchArgs[i]
                    if (i !== searchArgs.length - 1)
                        url += "&"
                }
                const response = await axios.get(url);
                console.log(response.data);
                setUniversities(response.data.slice(0, 5000))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        search()
    }, []);

    return (
        <div className="flex flex-col p-8">
            <div className="flex mb-8">
                <IoChevronBackCircleOutline onClick={() => navigate("/")} className="w-9 h-9 cursor-pointer" />
                <h1 className="ml-5 text-2xl">Universities</h1>
            </div>
            {universities.map((uni, idx) => (
                <div className="mb-4" key={idx}>
                    <UniversityCard university={uni} />
                </div>
            ))}
        </div>
    )
}

export default UniversitiesList