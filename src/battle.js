import {getRandomElement} from "./helper.js";

export function attack(attacker, attackType, target) {
  const attackValue = attacker["attacks"][attackType];
  const targetHP = target["hp"];

  const resultingHP = Math.max(0, targetHP - attackValue);

  target["hp"] = resultingHP;
}

export function checkWinningCondition(playerTeam, opponentTeam) {
  if (playerTeam.length === 0)
    return "OPPONENT TEAM WINS!";
  else if (opponentTeam.length === 0)
    return "PLAYER TEAM WINS!";
  else
    return "";
}

export function opponentTurn(opponentTeam, playerTeam) {
  const attacker = getRandomElement(opponentTeam);
  const target = getRandomElement(playerTeam);

  const attackType = getRandomElement(Object.keys(attacker["attacks"]));

  attack(attacker, attackType, target);

  if (target["hp"] === 0)
    return playerTeam.filter(hero => hero !== target);

  return playerTeam;
}