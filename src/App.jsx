import {useEffect, useState} from "react";
import {createTeams} from "./setup.js";
import HeroCard from "./components/HeroCard.jsx";

function App() {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  useEffect(() => {
    createTeams().then(([team1, team2]) => {
      setTeam1(team1);
      setTeam2(team2);
    });
  }, []);

  return (<>
      <div className="absolute inset-0 -z-20 bg-[url(/src/assets/beams.jpg)] bg-center"/>
      <div className="absolute inset-0 -z-10 bg-[url(/src/assets/grid.svg)] bg-center"/>
      <div className="flex flex-col items-center justify-center gap-14 h-screen">
        <div className="flex flex-row gap-10 items-center justify-center">
          {team1 && team1.map(hero => (
            <HeroCard key={hero["id"]} data={hero} />
          ))}
        </div>
        <div className="flex flex-row gap-10 items-center justify-center">
          {team2 && team2.map(hero => (
            <HeroCard key={hero["id"]} data={hero} />
          ))}
        </div>
      </div>
    </>);
}

export default App;
