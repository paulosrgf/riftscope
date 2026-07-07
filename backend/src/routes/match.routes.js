const express = require('express');
const router = express.Router();
const riotApi = require('../services/riotApi');

router.get('/history/:gameName/:tagLine', async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    const count = Math.min(parseInt(req.query.count) || 10, 20);

    const account = await riotApi.getAccountByRiotId(gameName, tagLine);
    const matchIds = await riotApi.getMatchIdsByPuuid(account.puuid, count, riotApi.DEFAULT_REGION);

    const matches = [];
    for (const matchId of matchIds) {
      const raw = await riotApi.getMatchById(matchId, riotApi.DEFAULT_REGION);
      matches.push(await riotApi.decorateMatchHistory(raw, account.puuid));
    }
    res.json(matches);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'Invocador ou histórico não encontrado' });
    }
    console.error(err.message);
    res.status(500).json({ error: 'Falha ao carregar histórico' });
  }
});

router.get('/detail/:matchId', async (req, res) => {
  try {
    const raw = await riotApi.getMatchById(req.params.matchId, riotApi.DEFAULT_REGION);
    const result = await riotApi.decorateFullMatch(raw);
    res.json(result);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'Partida não encontrada' });
    }
    console.error(err.message);
    res.status(500).json({ error: 'Falha ao carregar detalhes da partida' });
  }
});

module.exports = router;