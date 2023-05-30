import {useEffect, useState} from "react";
import {createTeams} from "./setup.js";
import HeroCard from "./components/HeroCard.jsx";
import {attack, checkWinningCondition, opponentTurn} from "./battle.js";
import WinningScreen from "./components/WinningScreen.jsx";

function App() {
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [playerTeam, setPlayerTeam] = useState([]);
  const [winningMessage, setWinningMessage] = useState("");
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  useEffect(() => {
    if (!winningMessage)
      newGame();
  }, [winningMessage]);

  function newGame() {
    createTeams().then(([team1, team2]) => {
      setOpponentTeam(team1);
      setPlayerTeam(team2);
    });

    setWinningMessage("");
  }

  function handleAttackSelected([attacker, attackType]) {
    setSelectedAttack([attacker, attackType]);
  }

  function handleTargetSelected(target) {
    setSelectedTarget(target);
    const [attacker, attackType] = selectedAttack;
    attack(attacker, attackType, target);

    setSelectedAttack(null);
    setSelectedTarget(null);

    if (target["hp"] == 0) {
      const filteredTeam = opponentTeam.filter(hero => hero !== target);
      setOpponentTeam(filteredTeam);
      const message = checkWinningCondition(playerTeam, filteredTeam);
      if (message) {
        setWinningMessage(message);
        return;
      }
    }

    const updatedPlayerTeam = opponentTurn(opponentTeam, playerTeam);
    setPlayerTeam(updatedPlayerTeam);
    const message = checkWinningCondition(updatedPlayerTeam, opponentTeam);
    if (message)
      setWinningMessage(message);
  }

  return (
    <>
      <div className="absolute inset-0 -z-20 bg-[url(/src/assets/beams.jpg)] bg-center"/>
      <div className="absolute inset-0 -z-10 bg-[url(/src/assets/grid.svg)] bg-center"/>
      <div className="flex flex-col items-center justify-center gap-14 h-screen">
        <div className="relative w-full flex flex-row gap-10 items-center justify-center">
          <h2 className="absolute top-0 left-0 m-2">Enemy's team</h2>
          {opponentTeam && opponentTeam.map(hero => (
            <HeroCard
              key={hero["id"]}
              data={hero}
              targetSelectable={!!selectedAttack}
              onTargetSelected={handleTargetSelected}
            />
          ))}
        </div>
        <div className="relative w-full flex flex-row gap-10 items-center justify-center">
          <h2 className="absolute top-0 left-0 m-2">Your team</h2>
          {playerTeam && playerTeam.map(hero => (
            <HeroCard
              key={hero["id"]}
              data={hero}
              attackSelectable={!selectedAttack}
              selectedAttack={selectedAttack}
              onAttackSelected={handleAttackSelected}
            />
          ))}
        </div>
        {winningMessage && <WinningScreen message={winningMessage} newGame={newGame} /> }
      </div>
    </>
  );
}

export default App;
