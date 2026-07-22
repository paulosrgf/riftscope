const express = require("express");
const router = express.Router();
const {
  generatePlayerRank,
  generateMatchHistory,
  getMatchDetail,
} = require("../data/valorantMockGenerator");
const {
  agentIcon,
  weaponIcon,
  tierIcon,
  mapSplash,
} = require("../services/valorantStatic");
const { calculateImpactRating } = require("../services/scoreCalculator");

// TODO fase 2 (API real): quando a production key for aprovada, trocar generateMatchHistory/
// generatePlayerRank/getMatchDetail por chamadas reais a val-match-v1 e val-ranked-v1,
// mantendo o mesmo formato de retorno decorado abaixo. Os ícones já vêm de fonte real (valorant-api.com).

router.get("/player/:gameName/:tagLine", async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    const rank = generatePlayerRank(gameName, tagLine);
    const matches = generateMatchHistory(gameName, tagLine, 20);

    const totalMatches = matches.length;
    const wins = matches.filter((m) => m.win).length;
    const winRate = Math.round((wins / totalMatches) * 100);
    const avg = (key) =>
      matches.reduce((sum, m) => sum + m[key], 0) / totalMatches;

    const avgAcs = Math.round(avg("acs"));
    const avgHs = Math.round(avg("headshotPercent"));
    const avgKills = avg("kills");
    const avgDeaths = avg("deaths");
    const avgAssists = avg("assists");
    const kd = (avgKills / Math.max(avgDeaths, 1)).toFixed(2);

    const overallRating = calculateImpactRating({
      acs: avgAcs,
      kills: avgKills,
      deaths: avgDeaths,
      assists: avgAssists,
      headshotPercent: avgHs,
      firstBloods: 1.2,
      roundsPlayed: 22,
    });

    const weaponAgg = {};
    matches.forEach((m) => {
      m.weaponKills.forEach((w) => {
        if (!weaponAgg[w.weaponName]) {
          weaponAgg[w.weaponName] = {
            weaponName: w.weaponName,
            kills: 0,
            headshots: 0,
            bodyshots: 0,
            legshots: 0,
          };
        }
        weaponAgg[w.weaponName].kills += w.kills;
        weaponAgg[w.weaponName].headshots += w.headshots;
        weaponAgg[w.weaponName].bodyshots += w.bodyshots;
        weaponAgg[w.weaponName].legshots += w.legshots;
      });
    });

    const weaponStats = Object.values(weaponAgg)
      .map((w) => {
        const totalShots = w.headshots + w.bodyshots + w.legshots;
        return {
          ...w,
          headshotPercent:
            totalShots > 0 ? Math.round((w.headshots / totalShots) * 100) : 0,
          iconUrl: weaponIcon(w.weaponName),
        };
      })
      .sort((a, b) => b.kills - a.kills)
      .slice(0, 5);

    res.json({
      gameName,
      tagLine,
      rank: { ...rank, iconUrl: tierIcon(rank.tier, rank.division) },
      stats: {
        matchesAnalyzed: totalMatches,
        winRate,
        avgAcs,
        avgHs,
        kd,
        overallRating,
      },
      weaponStats,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Falha ao carregar jogador de Valorant" });
  }
});

router.get("/matches/history/:gameName/:tagLine", async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    const count = Math.min(parseInt(req.query.count) || 10, 20);
    const matches = generateMatchHistory(gameName, tagLine, count).map((m) => ({
      ...m,
      agentIconUrl: agentIcon(m.agentName),
      mapSplashUrl: mapSplash(m.map),
    }));
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Falha ao carregar histórico de Valorant" });
  }
});

router.get("/matches/detail/:matchId", async (req, res) => {
  try {
    const match = getMatchDetail(req.params.matchId);
    res.json({
      ...match,
      mapSplashUrl: mapSplash(match.map),
      participants: match.participants.map((p) => ({
        ...p,
        agentIconUrl: agentIcon(p.agentName),
      })),
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Falha ao carregar detalhes da partida de Valorant" });
  }
});

module.exports = router;
