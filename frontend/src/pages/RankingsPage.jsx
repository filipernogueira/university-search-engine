import { WorldRanking } from "../components"
import { useState, useEffect } from 'react';


const RankingsPage = () => {

  const [rankingType, setRankingType] = useState("");

  return (
    <div>
      <h1>Rankings Page</h1>
      <button onClick={() => setRankingType("world")}>World Ranking</button>
      <button className="ml-8" onClick={() => setRankingType("cs")}>Computer Science Ranking</button>
      { rankingType !== "" &&
        <WorldRanking type={rankingType} />
      }
    </div>
  )
}

export default RankingsPage