export function attack(attacker, attackType, target) {
  const attackValue = attacker["attacks"][attackType];
  const targetHP = target["hp"];

  const resultingHP = Math.max(0, targetHP - attackValue);

  target["hp"] = resultingHP;
}