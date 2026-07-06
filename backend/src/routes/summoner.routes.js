const express = require("express");
const router = express.Router();
const { generateSummoner } = require("../data/mockGenerator");
const { getLatestVersion, profileIconUrl } = require("../utils/ddragon");

// GET /api/summoner/:gameName/:tagLine
router.get("/:gameName/:tagLine", async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    const summoner = generateSummoner(gameName, tagLine);
    const version = await getLatestVersion();
    res.json({
      ...summoner,
      profileIconUrl: profileIconUrl(version, summoner.profileIconId),
      ddragonVersion: version,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao carregar invocador" });
  }
});

module.exports = router;
