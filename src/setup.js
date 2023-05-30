import {getRandomIntInclusive} from "./helper.js";
import config from "./config.json";
import {
  calculateAttacks,
  calculateHP,
  calculateStats,
  generateActualStamina,
  generateFiliationCoefficient
} from "./stats.js";


function getRandomIds(start, end, length) {
  const ids = [];

  while (ids.length < length) {
    const randomId = getRandomIntInclusive(start, end);
    if (!ids.includes(randomId)) ids.push(randomId);
  }

  return ids;
}

function parseStats(stats, minRandomVal = 10, maxRandomVal = 50) {
  Object.entries(stats).forEach(([stat, val]) => {
    stats[stat] = (val === 'null') ? getRandomIntInclusive(minRandomVal, maxRandomVal) : parseInt(val);
  })

  return stats;
}

async function fetchHeroData(id) {
  const baseUrl = config["BASE_URL"];
  const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;
  const url = `${baseUrl}/${accessToken}/${id}`;

  const response = await fetch(url);
  const data = await response.json();

  data["powerstats"] = parseStats(data["powerstats"]);

  return data;
}

function fetchHeroesData(ids) {
  const heroPromises = ids.map(id => fetchHeroData(id));

  return Promise.all(heroPromises);
}


function populateActualStamina(team) {
  team.forEach(hero => {
    const stats = hero["powerstats"];
    hero["actualStamina"] = generateActualStamina(stats);
  });
}


function getTeamAlignment(team) {
  const alignments = team.map(hero => hero["biography"]["alignment"]);

  const alignmentsCount = {};
  alignments.forEach(alignment => alignmentsCount[alignment] = (alignmentsCount[alignment] || 0) + 1);

  let mostCommonAlignment = null;
  let mostCommonCount = 0;

  Object.entries(alignmentsCount).forEach(([alignment, count]) => {
    if (count > mostCommonCount) {
      mostCommonAlignment = alignment;
      mostCommonCount = count;
    }
  });

  return mostCommonAlignment;
}

function populateFiliationCoefficient(team) {
  const teamAlignment = getTeamAlignment(team);

  team.forEach(hero => {
    const heroAlignment = hero["biography"]["alignment"];
    hero["filiationCoefficient"] = generateFiliationCoefficient(heroAlignment, teamAlignment);
  });
}


function populateStats(team) {
  team.forEach(hero => hero["stats"] = calculateStats(hero));
}


function populateHP(team) {
  team.forEach(hero => hero["hp"] = calculateHP(hero));
}


function populateAttacks(team) {
  team.forEach(hero => hero["attacks"] = calculateAttacks(hero));
}


export async function createTeams() {
  const teamSize = config["TEAM_SIZE"];

  const ids = getRandomIds(config["API_ID_START"], config["API_ID_END"], 2 * teamSize);

  const heroes = await fetchHeroesData(ids);
  const team1 = heroes.slice(0, teamSize);
  const team2 = heroes.slice(teamSize);

  const teams = [team1, team2];

  teams.forEach(team => {
    populateActualStamina(team);
    populateFiliationCoefficient(team);
    populateStats(team);
    populateHP(team);
    populateAttacks(team);
  });

  return teams;
}
