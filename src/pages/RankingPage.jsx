import { useState, useEffect } from 'react';
import axios from 'axios';

const RankingPage = () => {

    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/universityRanking');
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
            <h1>Ranking</h1>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    {universities.map((university) => (
                        <tr>
                            <td>{university}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RankingPage