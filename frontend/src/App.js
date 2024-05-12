import "./styles.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, ResultsPage, RankingsPage, UniversitiesList } from "./pages";

function App() {
    const [query, setQuery] = useState("");
    const [searchArgs, setsearchArgs] = useState([]);
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        console.log(searchArgs);
    }, [searchArgs]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <MainPage
                            query={query}
                            setQuery={setQuery}
                            country={country}
                            setCountry={setCountry}
                            name={name}
                            setName={setName}
                            setsearchArgs={setsearchArgs}
                        />
                    }
                />
                <Route
                    path="/results"
                    element={<ResultsPage query={query} setQuery={setQuery} />}
                />
                <Route path="/ranking" element={<RankingsPage />} />
                <Route
                    path="/universities"
                    element={
                        <UniversitiesList
                            country={country}
                            setCountry={setCountry}
                            name={name}
                            setName={setName}
                            searchArgs={searchArgs}
                            setsearchArgs={setsearchArgs}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
