const axios = require('axios');
const rateLimiter = require('./rateLimiter');
const { regionalRouting, platformsForRegion } = require('../config/regions');
const { getCached, setCached } = require('./cache');
const { getLatestVersion, championIconUrl, itemIconUrl, profileIconUrl } = require('../utils/ddragon');
const { spellIconById, runeStyleIconById, runePerkIconById } = require('./ddragonStatic');

const DEFAULT_PLATFORM = process.env.PLATFORM || 'na1';
const DEFAULT_REGION = regionalRouting(DEFAULT_PLATFORM);

function riotHeaders() {
  return { 'X-Riot-Token': process.env.RIOT_API_KEY };
}

async function riotGet(url) {
  return rateLimiter.schedule(async () => {
    try {
      const res = await axios.get(url, { headers: riotHeaders() });
      return res.data;
    } catch (err) {
      console.error(`[riotGet] FALHOU -> ${url}`);
      console.error(`[riotGet] status: ${err.response?.status} | body:`, err.response?.data);
      throw err;
    }
  });
}

// --- ACCOUNT-V1 (regional) ---
async function getAccountByRiotId(gameName, tagLine) {
  const cacheKey = `account:${gameName}:${tagLine}`.toLowerCase();
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const url = `https://${DEFAULT_REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
  const data = await riotGet(url);
  await setCached(cacheKey, data, 60 * 60 * 6);
  return data;
}

// --- SUMMONER-V4 (platform) — tenta todas as plataformas do continente ---
async function getSummonerByPuuid(puuid, region = DEFAULT_REGION) {
  const cacheKey = `summoner:${puuid}`;
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const candidatePlatforms = platformsForRegion(region);

  for (const platform of candidatePlatforms) {
    try {
      const url = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
      const data = await riotGet(url);
      const result = { ...data, resolvedPlatform: platform };
      await setCached(cacheKey, result, 60 * 15);
      return result;
    } catch (err) {
      if (err.response?.status === 404) continue;
      throw err;
    }
  }

  const notFoundError = new Error('summoner not found in any platform of this region');
  notFoundError.response = { status: 404 };
  throw notFoundError;
}

// --- LEAGUE-V4 (platform) ---
async function getLeagueEntries(puuid, platform = DEFAULT_PLATFORM) {
  const cacheKey = `league:${puuid}`;
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const url = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;
  const data = await riotGet(url);
  await setCached(cacheKey, data, 60 * 5);
  return data;
}

// --- MATCH-V5: lista de ids (regional) ---
async function getMatchIdsByPuuid(puuid, count = 10, region = DEFAULT_REGION) {
  const cacheKey = `matchlist:${puuid}:${count}`;
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`;
  const data = await riotGet(url);
  await setCached(cacheKey, data, 60 * 3);
  return data;
}

// --- MATCH-V5: detalhe (regional) — imutável, cache longo ---
async function getMatchById(matchId, region = DEFAULT_REGION) {
  const cacheKey = `match:${matchId}`;
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
  const data = await riotGet(url);
  await setCached(cacheKey, data, 60 * 60 * 24 * 30);
  return data;
}

// --- Decoradores ---
async function decorateSummoner(account, summoner, leagueEntries) {
  const version = await getLatestVersion();
  const solo = leagueEntries.find((e) => e.queueType === 'RANKED_SOLO_5x5');

  return {
    puuid: account.puuid,
    gameName: account.gameName,
    tagLine: account.tagLine,
    profileIconId: summoner.profileIconId,
    profileIconUrl: profileIconUrl(version, summoner.profileIconId),
    summonerLevel: summoner.summonerLevel,
    ddragonVersion: version,
    resolvedPlatform: summoner.resolvedPlatform,
    rank: solo
      ? {
          tier: solo.tier,
          division: solo.rank,
          lp: solo.leaguePoints,
          wins: solo.wins,
          losses: solo.losses,
          queueType: solo.queueType,
        }
      : { tier: 'UNRANKED', division: null, lp: 0, wins: 0, losses: 0, queueType: 'RANKED_SOLO_5x5' },
  };
}

async function decorateParticipant(version, p) {
  const items = [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5];
  return {
    puuid: p.puuid,
    gameName: p.riotIdGameName,
    tagLine: p.riotIdTagline,
    championName: p.championName,
    championLevel: p.champLevel,
    teamPosition: p.teamPosition,
    win: p.win,
    kills: p.kills,
    deaths: p.deaths,
    assists: p.assists,
    cs: p.totalMinionsKilled + p.neutralMinionsKilled,
    goldEarned: p.goldEarned,
    totalDamageDealtToChampions: p.totalDamageDealtToChampions,
    visionScore: p.visionScore,
    championIconUrl: championIconUrl(version, p.championName),
    itemUrls: items.map((id) => itemIconUrl(version, id)),
    trinketUrl: itemIconUrl(version, p.item6),
    spellUrls: [spellIconById(p.summoner1Id), spellIconById(p.summoner2Id)],
    runeUrls: {
      primary: runePerkIconById(p.perks.styles[0].selections[0].perk),
      secondary: runeStyleIconById(p.perks.styles[1].style),
    },
  };
}

async function decorateMatchHistory(matchDetail, puuid) {
  const version = await getLatestVersion();
  const me = matchDetail.info.participants.find((p) => p.puuid === puuid);
  const decorated = await decorateParticipant(version, me);
  return {
    matchId: matchDetail.metadata.matchId,
    gameMode: matchDetail.info.gameMode,
    queueId: matchDetail.info.queueId,
    gameDuration: matchDetail.info.gameDuration,
    gameCreation: matchDetail.info.gameCreation,
    ...decorated,
  };
}

async function decorateFullMatch(matchDetail) {
  const version = await getLatestVersion();
  const participants = await Promise.all(
    matchDetail.info.participants.map((p) => decorateParticipant(version, p))
  );

  const teams = [100, 200].map((teamId) => {
    const rawParticipant = matchDetail.info.participants.find((p) => p.teamId === teamId);
    return {
      teamId,
      win: rawParticipant ? rawParticipant.win : false,
      participants: participants.filter((p) =>
        matchDetail.info.participants.find((raw) => raw.puuid === p.puuid).teamId === teamId
      ),
    };
  });

  return {
    matchId: matchDetail.metadata.matchId,
    gameMode: matchDetail.info.gameMode,
    queueId: matchDetail.info.queueId,
    gameDuration: matchDetail.info.gameDuration,
    gameCreation: matchDetail.info.gameCreation,
    teams,
  };
}

module.exports = {
  DEFAULT_REGION,
  DEFAULT_PLATFORM,
  getAccountByRiotId,
  getSummonerByPuuid,
  getLeagueEntries,
  getMatchIdsByPuuid,
  getMatchById,
  decorateSummoner,
  decorateMatchHistory,
  decorateFullMatch,
};