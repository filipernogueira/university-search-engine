import { RankingTable } from "../components"
import { useState, useEffect } from 'react';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const RankingsPage = () => {

  const [rankingType, setRankingType] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex items-center">
        <IoChevronBackCircleOutline onClick={() => navigate("/")} className="w-9 h-9 ml-10 cursor-pointer" />
        <h1 className="text-3xl my-8 mx-auto">Rankings Page</h1>
      </div>
      <div className="w-full flex justify-center">
        <button className="bg-gray-200 w-1/6 rounded-lg mt-5" onClick={() => setRankingType("world")}>World Ranking</button>
        <button className="ml-8 bg-gray-200 w-1/6 rounded-lg mt-5" onClick={() => setRankingType("cs")}>Computer Science Ranking</button>
      </div>
      { rankingType !== "" &&
        <RankingTable type={rankingType} />
      }
    </div>
  )
}

export default RankingsPage