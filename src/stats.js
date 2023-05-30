import {getRandomIntInclusive} from "./helper.js";

export function generateActualStamina(stats) {
  const actualStamina = {};

  Object.entries(stats).forEach(([stat, _]) => actualStamina[stat] = getRandomIntInclusive(0, 10));

  return actualStamina;
}

export function generateFiliationCoefficient(heroAlignment, teamAlignment) {
  const value = 1 + getRandomIntInclusive(0, 9);

  return heroAlignment === teamAlignment ? value : 1 / value;
}
