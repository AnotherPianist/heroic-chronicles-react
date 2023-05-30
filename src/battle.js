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