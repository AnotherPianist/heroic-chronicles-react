import {useEffect, useState} from "react";
import {createTeams} from "./setup.js";
import HeroCard from "./components/HeroCard.jsx";
import {attack, checkWinningCondition, opponentAttack} from "./battle.js";
import WinningScreen from "./components/WinningScreen.jsx";
import {sleep} from "./helper.js";

const MESSAGE_DURATION_MS = 3000;

function App() {
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [playerTeam, setPlayerTeam] = useState([]);
  const [winningMessage, setWinningMessage] = useState("");
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!winningMessage)
      newGame();
  }, [winningMessage]);

  function newGame() {
    createTeams().then(([team1, team2]) => {
      setOpponentTeam(team1);
      setPlayerTeam(team2);
    });

    setMessage("Select an attack");
    setWinningMessage("");
  }

  function handleAttackSelected([attacker, attackType]) {
    setSelectedAttack([attacker, attackType]);
    setMessage("Select a target");
  }

  async function handleTargetSelected(target) {
    const updatedOpponentTeam = await playerTurn(target);

    let updatedWinningMessage = checkWinningCondition(playerTeam, updatedOpponentTeam);
    if (updatedWinningMessage) {
      setWinningMessage(updatedWinningMessage);
      return;
    }

    const updatedPlayerTeam = await opponentTurn(updatedOpponentTeam);

    updatedWinningMessage = checkWinningCondition(updatedPlayerTeam, updatedOpponentTeam);
    if (updatedWinningMessage)
      setWinningMessage(updatedWinningMessage);
  }

  async function playerTurn(target) {
    setSelectedTarget(target);
    const [attacker, attackType] = selectedAttack;
    attack(attacker, attackType, target);

    setSelectedAttack(null);
    setSelectedTarget(null);
    setMessage(`${attacker["name"]} uses ${attackType} and deals ${attacker["attacks"][attackType]} damage to ${target["name"]}`);
    await sleep(MESSAGE_DURATION_MS);

    let updatedOpponentTeam = opponentTeam;

    if (target["hp"] === 0) {
      updatedOpponentTeam = opponentTeam.filter(hero => hero !== target);
      setOpponentTeam(updatedOpponentTeam);
      setMessage(`${target["name"]} is dead`);
      await sleep(MESSAGE_DURATION_MS);
    }

    return updatedOpponentTeam;
  }

  async function opponentTurn(updatedOpponentTeam) {
    const [attacker, attackType, target, updatedPlayerTeam] = opponentAttack(updatedOpponentTeam, playerTeam);
    setMessage(`${attacker["name"]} uses ${attackType} and deals ${attacker["attacks"][attackType]} damage to ${target["name"]}`);
    await sleep(MESSAGE_DURATION_MS);

    if (target["hp"] === 0) {
      setPlayerTeam(updatedPlayerTeam);
      setMessage(`${target["name"]} is dead`);
      await sleep(MESSAGE_DURATION_MS);
    }

    setMessage("Select an attack");

    return updatedPlayerTeam;
  }

  return (
    <>
      <div className="absolute inset-0 -z-20 bg-[url(/src/assets/beams.jpg)] bg-center"/>
      <div className="absolute inset-0 -z-10 bg-[url(/src/assets/grid.svg)] bg-center"/>
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
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
        <p>{message}</p>
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
