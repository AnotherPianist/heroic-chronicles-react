import {useEffect, useState} from "react";
import {createTeams} from "./setup.js";
import HeroCard from "./components/HeroCard.jsx";
import {attack} from "./battle.js";

function App() {
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [playerTeam, setPlayerTeam] = useState([]);
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  useEffect(() => {
    createTeams().then(([team1, team2]) => {
      setOpponentTeam(team1);
      setPlayerTeam(team2);
    });
  }, []);

  function handleAttackSelected([attacker, attackType]) {
    setSelectedAttack([attacker, attackType]);
  }

  function handleTargetSelected(target) {
    setSelectedTarget(target);
    const [attacker, attackType] = selectedAttack;
    attack(attacker, attackType, target);

    if (target["hp"] == 0)
      setOpponentTeam(opponentTeam.filter(hero => hero !== target));
  }

  return (
    <>
      <div className="absolute inset-0 -z-20 bg-[url(/src/assets/beams.jpg)] bg-center"/>
      <div className="absolute inset-0 -z-10 bg-[url(/src/assets/grid.svg)] bg-center"/>
      <div className="flex flex-col items-center justify-center gap-14 h-screen">
        <div className="relative w-full flex flex-row gap-10 items-center justify-center">
          <h2 className="absolute top-0 left-0 m-2">Enemy's team</h2>
          {opponentTeam && opponentTeam.map(hero => (
            <HeroCard key={hero["id"]} data={hero} targetSelectable={true} onTargetSelected={handleTargetSelected} />
          ))}
        </div>
        <div className="relative w-full flex flex-row gap-10 items-center justify-center">
          <h2 className="absolute top-0 left-0 m-2">Your team</h2>
          {playerTeam && playerTeam.map(hero => (
            <HeroCard key={hero["id"]} data={hero} attackSelectable={true} onAttackSelected={handleAttackSelected} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
