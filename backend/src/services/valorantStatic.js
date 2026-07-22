const axios = require("axios");

let agentIconMap = null;
let weaponIconMap = null;
let tierIconMap = null;
let mapSplashMap = null;
let loaded = false;

async function loadValorantStatic() {
  if (loaded) return;
  try {
    const [agentsRes, weaponsRes, tiersRes, mapsRes] = await Promise.all([
      axios.get("https://valorant-api.com/v1/agents?isPlayableCharacter=true"),
      axios.get("https://valorant-api.com/v1/weapons"),
      axios.get("https://valorant-api.com/v1/competitivetiers"),
      axios.get("https://valorant-api.com/v1/maps"),
    ]);

    agentIconMap = {};
    agentsRes.data.data.forEach((a) => {
      agentIconMap[a.displayName] = a.displayIcon;
    });

    weaponIconMap = {};
    weaponsRes.data.data.forEach((w) => {
      weaponIconMap[w.displayName] = w.displayIcon;
    });

    const latestTierSet = tiersRes.data.data[tiersRes.data.data.length - 1];
    tierIconMap = {};
    latestTierSet.tiers.forEach((t) => {
      if (t.tierName)
        tierIconMap[t.tierName.trim()] = t.largeIcon || t.smallIcon;
    });

    mapSplashMap = {};
    mapsRes.data.data.forEach((m) => {
      mapSplashMap[m.displayName] = m.splash;
    });

    loaded = true;
    console.log("[valorantStatic] ícones carregados via valorant-api.com");
  } catch (err) {
    console.error("[valorantStatic] falha ao carregar ícones:", err.message);
  }
}

function agentIcon(name) {
  return agentIconMap?.[name] || null;
}
function weaponIcon(name) {
  return weaponIconMap?.[name] || null;
}
function tierIcon(tierName, division) {
  const key = division ? `${tierName} ${division}` : tierName;
  return tierIconMap?.[key] || tierIconMap?.[tierName] || null;
}
function mapSplash(name) {
  return mapSplashMap?.[name] || null;
}

module.exports = {
  loadValorantStatic,
  agentIcon,
  weaponIcon,
  tierIcon,
  mapSplash,
};
