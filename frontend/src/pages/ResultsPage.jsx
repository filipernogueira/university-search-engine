import { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsPage = ({ query }) => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/searchResults', { query });
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
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