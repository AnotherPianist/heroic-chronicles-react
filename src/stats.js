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

export function calculateStats(hero) {
  const baseStats = hero["powerstats"];
  const actualStamina = hero["actualStamina"];
  const fb = hero["filiationCoefficient"];

  const stats = {};

  Object.keys(baseStats).forEach(stat => {
    stats[stat] = Math.floor(((2 * baseStats[stat] + actualStamina[stat]) / 1.1)) * fb
  });

  return stats;
}
