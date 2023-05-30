import {getRandomIntInclusive} from "./helper.js";
import config from "./config.json";


function getRandomIds(start, end, length) {
  const ids = [];

  while (ids.length < length) {
    const randomId = getRandomIntInclusive(start, end);
    if (!ids.includes(randomId)) ids.push(randomId);
  }

  return ids;
}

async function fetchHeroData(id) {
  const baseUrl = config["BASE_URL"];
  const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;
  const url = `${baseUrl}/${accessToken}/${id}`;

  const response = await fetch(url)
  return await response.json();
}

function fetchHeroesData(ids) {
  const heroPromises = ids.map(id => fetchHeroData(id));

  return Promise.all(heroPromises);
}

export async function createTeams() {
  const teamSize = config["TEAM_SIZE"];

  const ids = getRandomIds(config["API_ID_START"], config["API_ID_END"], 2 * teamSize);

  const heroes = await fetchHeroesData(ids);
  const team1 = heroes.slice(0, teamSize);
  const team2 = heroes.slice(teamSize);

  return [team1, team2];
}