import { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsPage = ({ query }) => {

  const [links, setLinks] = useState([]);

  // Function to fetch data from the backend API
  const fetchData = async () => {
    try {
      //const query = query;
      const response = await axios.post('http://localhost:5000/results', { query });
      //console.log(response.data)
      setLinks(response.data);
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
        <p>{query}</p>
        {links.map((link) => (
          <div key={link}>
            <p>{link}</p>
            <br/>
          </div>
        ))}
    </div>
  )
}

export default ResultsPage