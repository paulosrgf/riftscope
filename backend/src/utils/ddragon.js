// Helper para montar URLs do Data Dragon (CDN pública da Riot, sem API key).
let cachedVersion = "14.23.1"; // fallback caso a busca falhe
let lastFetch = 0;

async function getLatestVersion() {
  const now = Date.now();
  if (now - lastFetch < 1000 * 60 * 60) return cachedVersion; // cache de 1h
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
    );
    const versions = await res.json();
    cachedVersion = versions[0];
    lastFetch = now;
  } catch (err) {
    console.error(
      "[ddragon] falha ao buscar versão, usando fallback:",
      err.message,
    );
  }
  return cachedVersion;
}

const RUNE_TREE_ICON = {
  Precision: "7201_Precision.png",
  Domination: "7200_Domination.png",
  Sorcery: "7202_Sorcery.png",
  Resolve: "7204_Resolve.png",
  Inspiration: "7203_Whimsy.png",
};

const championIconUrl = (version, championId) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championId}.png`;

const itemIconUrl = (version, itemId) =>
  itemId
    ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`
    : null;

const spellIconUrl = (version, spellId) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellId}.png`;

const profileIconUrl = (version, iconId) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;

const runeTreeIconUrl = (treeName) =>
  `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${RUNE_TREE_ICON[treeName]}`;

module.exports = {
  getLatestVersion,
  championIconUrl,
  itemIconUrl,
  spellIconUrl,
  profileIconUrl,
  runeTreeIconUrl,
};
