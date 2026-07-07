const axios = require('axios');
const { getLatestVersion } = require('../utils/ddragon');

let spellMap = null;
let runeStyleIcon = null;
let runePerkIcon = null;
let loadedVersion = null;

async function loadStaticData() {
  const version = await getLatestVersion();
  if (loadedVersion === version && spellMap) return; // já carregado nessa versão

  const [summonerRes, runesRes] = await Promise.all([
    axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`),
    axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`),
  ]);

  spellMap = {};
  Object.values(summonerRes.data.data).forEach((spell) => {
    spellMap[spell.key] = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`;
  });

  runeStyleIcon = {};
  runePerkIcon = {};
  runesRes.data.forEach((style) => {
    runeStyleIcon[style.id] = `https://ddragon.leagueoflegends.com/cdn/img/${style.icon}`;
    style.slots.forEach((slot) => {
      slot.runes.forEach((rune) => {
        runePerkIcon[rune.id] = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
      });
    });
  });

  loadedVersion = version;
  console.log(`[ddragonStatic] tabelas de spell/runa carregadas (v${version})`);
}

function spellIconById(id) {
  return spellMap?.[id] || null;
}

function runeStyleIconById(id) {
  return runeStyleIcon?.[id] || null;
}

function runePerkIconById(id) {
  return runePerkIcon?.[id] || null;
}

module.exports = { loadStaticData, spellIconById, runeStyleIconById, runePerkIconById };