import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";

const RankingTable = ({ type }) => {
    const [universities, setUniversities] = useState([]);
    const [areResultsReady, setAreResultsReady] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:5000/universityRanking",
                    { type }
                );
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
    }, [type]);

    return (
        <>
            {areResultsReady && (
                <table className="w-1/2 divide-y divide-gray-200 mt-10">
                    <thead>
                        <tr>
                            <th className="text-center p-3 bg-secondary text-xs font-medium text-white uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="text-center p-3 bg-secondary text-xs font-medium text-white uppercase tracking-wider">
                                Name
                            </th>
                            <th className="text-center p-3 bg-secondary text-xs font-medium text-white uppercase tracking-wider">
                                Country
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {universities.map((university, idx) => (
                            <tr key={idx}>
                                <td className="text-center p-4">{idx + 1}</td>
                                <td className="text-center p-4">
                                    {university.name}
                                </td>
                                <td className="text-center p-4">
                                    {university.country}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!areResultsReady && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner className="h-12 w-12" />
                </div>
            )}
        </>
    );
};

export default RankingTable;
