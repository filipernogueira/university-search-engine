import { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsPage = ({ query }) => {

  const [results, setResults] = useState([]);

  // Function to fetch data from the backend API
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/results', { query });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h1>Results</h1>
        {results.map((result, idx) => (
          <div key={idx}>
            <a href={result.link} target="_blank">{result.title}</a>
            <br/>
            <br/>
          </div>
        ))}
    </div>
  )
}

export default ResultsPage