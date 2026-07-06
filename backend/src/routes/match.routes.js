const express = require("express");
const router = express.Router();
const {
  generateMatchHistory,
  getMatchDetail,
} = require("../data/mockGenerator");
const {
  getLatestVersion,
  championIconUrl,
  itemIconUrl,
  spellIconUrl,
  runeTreeIconUrl,
} = require("../utils/ddragon");

function decorateParticipant(version, p) {
  return {
    ...p,
    championIconUrl: championIconUrl(version, p.championName),
    itemUrls: p.items.map((id) => itemIconUrl(version, id)),
    trinketUrl: itemIconUrl(version, p.trinket),
    spellUrls: p.summonerSpells.map((s) => spellIconUrl(version, s)),
    runeUrls: {
      primary: runeTreeIconUrl(p.runes.primary),
      secondary: runeTreeIconUrl(p.runes.secondary),
    },
  };
}

// GET /api/matches/history/:gameName/:tagLine?count=10
router.get("/history/:gameName/:tagLine", async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    const count = Math.min(parseInt(req.query.count) || 10, 20);
    const version = await getLatestVersion();
    const matches = generateMatchHistory(gameName, tagLine, count).map((m) =>
      decorateParticipant(version, m),
    );
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao carregar histórico" });
  }
});

// GET /api/matches/detail/:matchId
router.get("/detail/:matchId", async (req, res) => {
  try {
    const version = await getLatestVersion();
    const match = getMatchDetail(req.params.matchId);
    res.json({
      ...match,
      teams: match.teams.map((t) => ({
        ...t,
        participants: t.participants.map((p) =>
          decorateParticipant(version, p),
        ),
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao carregar detalhes da partida" });
  }
});

module.exports = router;
