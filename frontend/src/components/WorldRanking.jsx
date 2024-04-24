import { useState, useEffect } from 'react';
import axios from 'axios';

const WorldRanking = ({ type }) => {

    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/universityRanking', { type });
                console.log(response.data);
                setUniversities(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };  

        fetchData();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Country</td>
                    </tr>
                </thead>
                <tbody>
                    {universities.map((university, idx) => (
                        <tr key={idx}>
                            <td>{university.name}</td>
                            <td>{university.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WorldRanking