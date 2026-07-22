const { hashString, mulberry32 } = require("../utils/seededRandom");
const {
  AGENTS,
  WEAPONS,
  MAPS,
  MODES,
  TIERS,
  NAME_PARTS_1,
  NAME_PARTS_2,
} = require("./valorantAssets");
const { calculateImpactRating } = require("../services/scoreCalculator");

const matchStore = new Map();

const rngFor = (seedStr) => mulberry32(hashString(seedStr));
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

function makeRandomName(rng) {
  const name = `${pick(rng, NAME_PARTS_1)}${pick(rng, NAME_PARTS_2)}${Math.floor(rng() * 999)}`;
  const tagLine = pick(rng, ["GOTH", "RIP", "DUSK", "BR1", "666", "VLR"]);
  return { gameName: name, tagLine };
}

const generatePuuid = (gameName, tagLine) =>
  `vpuuid-${hashString(`${gameName}#${tagLine}`.toLowerCase())}`;

function generateRank(rng) {
  const tier = pick(rng, TIERS);
  const hasDivision = tier !== "Radiant";
  const division = hasDivision ? 1 + Math.floor(rng() * 3) : null;
  return { tier, division, rr: Math.floor(rng() * 100) };
}

function generateWeaponKills(rng, totalKills) {
  const weaponCount = Math.min(3, Math.max(1, Math.floor(rng() * 3) + 1));
  const used = new Set();
  const entries = [];
  let remaining = totalKills;

  for (let i = 0; i < weaponCount && remaining > 0; i++) {
    let weapon = pick(rng, WEAPONS);
    while (used.has(weapon) && used.size < WEAPONS.length)
      weapon = pick(rng, WEAPONS);
    used.add(weapon);

    const kills =
      i === weaponCount - 1
        ? remaining
        : Math.min(remaining, 1 + Math.floor(rng() * remaining));
    remaining -= kills;
    const headshots = Math.floor(kills * (0.15 + rng() * 0.35));
    const bodyshots = Math.floor(kills * (0.4 + rng() * 0.3));
    const legshots = Math.max(0, kills - headshots - bodyshots);

    entries.push({ weaponName: weapon, kills, headshots, bodyshots, legshots });
  }
  return entries;
}

function generateParticipant(rng, overrides = {}) {
  const identity = overrides.identity || makeRandomName(rng);
  const roundsPlayed = overrides.roundsPlayed || 22;
  const kills = overrides.kills ?? Math.floor(rng() * 26);
  const deaths = overrides.deaths ?? 5 + Math.floor(rng() * 15);
  const assists = overrides.assists ?? Math.floor(rng() * 12);
  const acs = overrides.acs ?? 120 + Math.floor(rng() * 180);
  const adr = Math.floor(acs * (0.6 + rng() * 0.2));
  const firstBloods = Math.floor(rng() * 5);
  const weaponKills = generateWeaponKills(rng, kills);
  const totalShots = weaponKills.reduce(
    (s, w) => s + w.headshots + w.bodyshots + w.legshots,
    0,
  );
  const totalHs = weaponKills.reduce((s, w) => s + w.headshots, 0);
  const headshotPercent =
    totalShots > 0 ? Math.round((totalHs / totalShots) * 100) : 0;

  const rating = calculateImpactRating({
    acs,
    kills,
    deaths,
    assists,
    headshotPercent,
    firstBloods,
    roundsPlayed,
  });

  return {
    puuid:
      overrides.puuid || generatePuuid(identity.gameName, identity.tagLine),
    gameName: identity.gameName,
    tagLine: identity.tagLine,
    agentName: overrides.agentName || pick(rng, AGENTS),
    teamId: overrides.teamId,
    win: overrides.win,
    kills,
    deaths,
    assists,
    acs,
    adr,
    headshotPercent,
    firstBloods,
    plants: Math.floor(rng() * 3),
    defuses: Math.floor(rng() * 2),
    weaponKills,
    rating,
  };
}

function generateMatch(matchId, seedPlayer) {
  const rng = rngFor(matchId);
  const map = pick(rng, MAPS);
  const mode = pick(rng, MODES);
  const attackersWin = rng() > 0.5;
  const roundsPlayed = 15 + Math.floor(rng() * 10);

  const attackers = Array.from({ length: 5 }, (_, i) =>
    generateParticipant(rng, {
      teamId: "Attacker",
      win: attackersWin,
      roundsPlayed,
      ...(i === 0 && seedPlayer
        ? {
            identity: seedPlayer,
            puuid: generatePuuid(seedPlayer.gameName, seedPlayer.tagLine),
            agentName: seedPlayer.agentName,
          }
        : {}),
    }),
  );
  const defenders = Array.from({ length: 5 }, () =>
    generateParticipant(rng, {
      teamId: "Defender",
      win: !attackersWin,
      roundsPlayed,
    }),
  );

  const match = {
    matchId,
    map,
    mode,
    roundsPlayed,
    gameCreation: Date.now() - Math.floor(rng() * 1000 * 60 * 60 * 24 * 14),
    gameDuration: roundsPlayed * 95,
    teams: [
      { teamId: "Attacker", won: attackersWin },
      { teamId: "Defender", won: !attackersWin },
    ],
    participants: [...attackers, ...defenders],
  };

  matchStore.set(matchId, match);
  return match;
}

function generateMatchHistory(gameName, tagLine, count = 10) {
  const rng = rngFor(`${gameName}#${tagLine}`.toLowerCase() + "-vlr-history");
  const matches = [];

  for (let i = 0; i < count; i++) {
    const matchId = `VLR_${hashString(`${gameName}${tagLine}${i}`)}`;
    const agentName = pick(rng, AGENTS);
    const full = generateMatch(matchId, { gameName, tagLine, agentName });
    const me = full.participants.find(
      (p) => p.puuid === generatePuuid(gameName, tagLine),
    );

    matches.push({
      matchId,
      map: full.map,
      mode: full.mode,
      win: me.win,
      agentName: me.agentName,
      kills: me.kills,
      deaths: me.deaths,
      assists: me.assists,
      acs: me.acs,
      adr: me.adr,
      headshotPercent: me.headshotPercent,
      rating: me.rating,
      weaponKills: me.weaponKills,
      gameCreation: full.gameCreation,
      gameDuration: full.gameDuration,
      roundsPlayed: full.roundsPlayed,
    });
  }
  return matches;
}

function getMatchDetail(matchId) {
  if (matchStore.has(matchId)) return matchStore.get(matchId);
  return generateMatch(matchId, null);
}

function generatePlayerRank(gameName, tagLine) {
  const rng = rngFor(`${gameName}#${tagLine}`.toLowerCase() + "-vlr-rank");
  return generateRank(rng);
}

module.exports = {
  generatePlayerRank,
  generateMatchHistory,
  getMatchDetail,
  generatePuuid,
};
