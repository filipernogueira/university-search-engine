import { useState, useEffect } from 'react';
import axios from 'axios';


const Filters = () => {
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");

    const search = async () => {
        try {
            let url = "http://localhost:5001/search?"
            let args = []
            if (country !== "")
                args.push("country=" + country)
            if (name !== "")
                args.push("name=" + name)
            
            for (let i = 0; i < args.length; i++) {
                url += args[i]
                if (i !== args.length - 1)
                    url += "&"
            }
            const response = await axios.get(url);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <input onChange={(e) => setCountry(e.target.value)} placeholder="country" />
            <input onChange={(e) => setName(e.target.value)} placeholder="name" />
            <button onClick={() => search()}>Submit</button>
        </div>
    )
}

export default Filters