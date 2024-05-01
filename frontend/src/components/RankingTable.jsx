import { useState, useEffect } from 'react';
import axios from 'axios';

const RankingTable = ({ type }) => {

    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/universityRanking', { type });
                console.log(response.data);
                setUniversities(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };  

        fetchData();
    }, [type]);

    return (
        <table className='w-1/2 divide-y divide-gray-200 mt-10'>
            <thead>
                <tr>
                    <th className='text-center p-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider'>Rank</th>
                    <th className='text-center p-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                    <th className='text-center p-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider'>Country</th>
                </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
                {universities.map((university, idx) => (
                    <tr key={idx}>
                        <td className='text-center p-4'>{idx + 1}</td>
                        <td className='text-center p-4'>{university.name}</td>
                        <td className='text-center p-4'>{university.country}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RankingTable