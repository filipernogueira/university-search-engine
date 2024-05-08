import './styles.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, ResultsPage, RankingsPage, UniversitiesList } from "./pages"


function App() {

  const [query, setQuery] = useState("");
  const [searchArgs, setsearchArgs] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage query={query} setQuery={setQuery} setsearchArgs={setsearchArgs} />} />
        <Route path="/results" element={<ResultsPage query={query} />} />
        <Route path="/ranking" element={<RankingsPage />} />
        <Route path="/universities" element={<UniversitiesList searchArgs={searchArgs} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
