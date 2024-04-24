import './styles.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, ResultsPage, RankingPage } from "./pages"


function App() {

  const [query, setQuery] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage query={query} setQuery={setQuery} />} />
        <Route path="/results" element={<ResultsPage query={query} />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
