const { hashString, mulberry32 } = require("../utils/seededRandom");
const {
  CHAMPIONS,
  ITEMS,
  SPELLS,
  RUNE_TREES,
  RANKS,
  QUEUES,
  NAME_PARTS_1,
  NAME_PARTS_2,
} = require("./gameAssets");

// "Banco de dados" em memória só para o mock. Quando plugar a API real,
// isso vira Redis (cache) + Postgres/Mongo (persistência).
const matchStore = new Map();

const rngFor = (seedStr) => mulberry32(hashString(seedStr));
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

function makeRandomName(rng) {
  const name = `${pick(rng, NAME_PARTS_1)}${pick(rng, NAME_PARTS_2)}${Math.floor(rng() * 999)}`;
  const tagLine = pick(rng, ["GOTH", "RIP", "DUSK", "NA1", "BR1", "666"]);
  return { gameName: name, tagLine };
}

const generatePuuid = (gameName, tagLine) =>
  `puuid-${hashString(`${gameName}#${tagLine}`.toLowerCase())}`;

function generateSummoner(gameName, tagLine) {
  const rng = rngFor(`${gameName}#${tagLine}`.toLowerCase());
  const tier = pick(rng, RANKS);
  return {
    puuid: generatePuuid(gameName, tagLine),
    gameName,
    tagLine,
    profileIconId: 1 + Math.floor(rng() * 28),
    summonerLevel: 30 + Math.floor(rng() * 470),
    rank: {
      tier,
      division: ["DIAMOND", "EMERALD"].includes(tier)
        ? null
        : ["IV", "III", "II", "I"][Math.floor(rng() * 4)],
      lp: Math.floor(rng() * 100),
      wins: 20 + Math.floor(rng() * 180),
      losses: 20 + Math.floor(rng() * 180),
      queueType: "RANKED_SOLO_5x5",
    },
  };
}

const POSITIONS = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

function generateParticipant(rng, overrides = {}) {
  const identity = overrides.identity || makeRandomName(rng);
  return {
    puuid:
      overrides.puuid || generatePuuid(identity.gameName, identity.tagLine),
    gameName: identity.gameName,
    tagLine: identity.tagLine,
    championName: overrides.championName || pick(rng, CHAMPIONS),
    championLevel: 6 + Math.floor(rng() * 12),
    teamPosition: overrides.teamPosition,
    win: overrides.win,
    kills: Math.floor(rng() * 14),
    deaths: Math.floor(rng() * 10),
    assists: Math.floor(rng() * 18),
    cs: 80 + Math.floor(rng() * 180),
    goldEarned: 8000 + Math.floor(rng() * 12000),
    totalDamageDealtToChampions: 8000 + Math.floor(rng() * 25000),
    visionScore: Math.floor(rng() * 60),
    items: Array.from({ length: 6 }, () => pick(rng, ITEMS)),
    trinket: pick(rng, [3340, 3363, 3364]),
    summonerSpells: [pick(rng, SPELLS), pick(rng, SPELLS)],
    runes: { primary: pick(rng, RUNE_TREES), secondary: pick(rng, RUNE_TREES) },
  };
}

function generateMatch(matchId, seedSummoner) {
  const rng = rngFor(matchId);
  const blueWin = rng() > 0.5;
  const queue = pick(rng, QUEUES);

  const blueTeam = POSITIONS.map((pos, i) =>
    generateParticipant(rng, {
      teamPosition: pos,
      win: blueWin,
      ...(i === 0 && seedSummoner
        ? {
            identity: seedSummoner,
            puuid: generatePuuid(seedSummoner.gameName, seedSummoner.tagLine),
            championName: seedSummoner.championName,
          }
        : {}),
    }),
  );
  const redTeam = POSITIONS.map((pos) =>
    generateParticipant(rng, { teamPosition: pos, win: !blueWin }),
  );

  const match = {
    matchId,
    gameMode: queue.name,
    queueId: queue.id,
    gameDuration: 900 + Math.floor(rng() * 1500),
    gameCreation: Date.now() - Math.floor(rng() * 1000 * 60 * 60 * 24 * 14),
    teams: [
      { teamId: 100, win: blueWin, participants: blueTeam },
      { teamId: 200, win: !blueWin, participants: redTeam },
    ],
  };

  matchStore.set(matchId, match);
  return match;
}

function generateMatchHistory(gameName, tagLine, count = 10) {
  const summonerRng = rngFor(
    `${gameName}#${tagLine}`.toLowerCase() + "-history",
  );
  const matches = [];

  for (let i = 0; i < count; i++) {
    const matchId = `NA1_${hashString(`${gameName}${tagLine}${i}`)}`;
    const championName = pick(summonerRng, CHAMPIONS);
    const full = generateMatch(matchId, { gameName, tagLine, championName });
    const me = full.teams
      .flatMap((t) => t.participants)
      .find((p) => p.puuid === generatePuuid(gameName, tagLine));

    matches.push({
      matchId,
      championName: me.championName,
      win: me.win,
      kills: me.kills,
      deaths: me.deaths,
      assists: me.assists,
      cs: me.cs,
      items: me.items,
      trinket: me.trinket,
      summonerSpells: me.summonerSpells,
      runes: me.runes,
      gameMode: full.gameMode,
      gameDuration: full.gameDuration,
      gameCreation: full.gameCreation,
    });
  }
  return matches;
}

function getMatchDetail(matchId) {
  if (matchStore.has(matchId)) return matchStore.get(matchId);
  return generateMatch(matchId, null); // fallback se o servidor reiniciou
}

module.exports = {
  generateSummoner,
  generateMatchHistory,
  getMatchDetail,
  generatePuuid,
};
