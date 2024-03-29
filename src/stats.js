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

export function calculateHP(hero) {
  const stats = hero["stats"];
  const fb = hero["filiationCoefficient"];

  const hp = Math.floor(((stats["strength"] * 0.8 + stats["durability"] * 0.7 + stats["power"]) / 2) * (1 + (fb / 10))) + 100;

  return hp;
}

export function calculateAttacks(hero) {
  const stats = hero["stats"];
  const fb = hero["filiationCoefficient"];

  const attacks = {
    "mental": Math.floor((stats["intelligence"] * 0.7 + stats["speed"] * 0.2 + stats["combat"] * 0.1) * fb),
    "strong": Math.floor((stats["strength"] * 0.6 + stats["power"] * 0.2 + stats["combat"] * 0.2) * fb),
    "fast": Math.floor((stats["speed"] * 0.55 + stats["durability"] * 0.25 + stats["strength"] * 0.2) * fb)
  };

  return attacks;
}
