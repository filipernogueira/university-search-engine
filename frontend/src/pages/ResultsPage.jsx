import { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsPage = ({ query }) => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/searchResults', { query });
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col p-8'>
        <h1 className='text-2xl mb-8'>Results</h1>
        {results.map((result, idx) => (
          <div className="mb-5" key={idx}>
            <a href={result.link} target="_blank">{result.title}</a>
            <p className='text-sm'>{result.description}</p>
          </div>
        ))}
    </div>
  )
}

export default ResultsPage