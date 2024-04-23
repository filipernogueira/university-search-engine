import './styles.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ResultsPage from "./pages/ResultsPage";


function App() {

  const [query, setQuery] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage query={query} setQuery={setQuery} />} />
        <Route path="/results" element={<ResultsPage query={query} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
