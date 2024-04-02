import './styles.css';
import { useState } from 'react';
import SearchBar from "./components/SearchBar";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center'>
      <SearchBar setQuery={setQuery} />
    </div>
  );
}

export default App;
