import {getRandomIntInclusive} from "./helper.js";

export function generateActualStamina(stats) {
  const actualStamina = {};

  Object.entries(stats).forEach(([stat, _]) => actualStamina[stat] = getRandomIntInclusive(0, 10));

  return actualStamina;
}