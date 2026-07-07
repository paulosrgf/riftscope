const express = require('express');
const router = express.Router();
const riotApi = require('../services/riotApi');

router.get('/:gameName/:tagLine', async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;

    const account = await riotApi.getAccountByRiotId(gameName, tagLine);
    const summoner = await riotApi.getSummonerByPuuid(account.puuid, riotApi.DEFAULT_REGION);
    const leagueEntries = await riotApi.getLeagueEntries(account.puuid, summoner.resolvedPlatform);
    const result = await riotApi.decorateSummoner(account, summoner, leagueEntries);

    res.json(result);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'Invocador não encontrado' });
    }
    if (err.response?.status === 403) {
      return res.status(403).json({ error: 'API key inválida ou expirada — gere uma nova no Developer Portal' });
    }
    console.error(err.message);
    res.status(500).json({ error: 'Falha ao carregar invocador' });
  }
});

module.exports = router;