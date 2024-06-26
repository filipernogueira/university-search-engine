import "./styles.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, ResultsPage, RankingsPage, UniversitiesList } from "./pages";

function App() {
    const [query, setQuery] = useState("");
    const [isListSearchReady, setIsListSearchReady] = useState([]);
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");

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
                            setIsListSearchReady={setIsListSearchReady}
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
                            isListSearchReady={isListSearchReady}
                            setIsListSearchReady={setIsListSearchReady}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
