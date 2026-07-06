const express = require("express");
const cors = require("cors");
const summonerRoutes = require("./routes/summoner.routes");
const matchRoutes = require("./routes/match.routes");

const app = express();
const PORT = process.env.PORT || 3000;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

app.use(cors());
app.use(express.json());

app.use("/api/summoner", summonerRoutes);
app.use("/api/matches", matchRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () =>
  console.log(`RiftScope backend rodando na porta ${PORT}`),
);

// Rota de Healthcheck (Essencial para monitoramento DevOps)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// Busca dados do Invocador usando Riot ID (Exemplo: /api/summoner/NomeDoPlayer/TAG)
app.get("/api/summoner/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;
  const cacheKey = `summoner:${gameName}-${tagLine}`;

  try {
    // 1. Tenta buscar no Cache do Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json({ source: "cache", data: JSON.parse(cachedData) });
    }

    // 2. Se não tiver no cache, busca na API da Riot
    const riotResponse = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers: { "X-Riot-Token": RIOT_API_KEY } },
    );

    const accountData = riotResponse.data;

    // 3. Salva no Redis por 1 hora (3600 segundos) para evitar estourar o Rate Limit
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(accountData));

    return res.json({ source: "riot_api", data: accountData });
  } catch (error) {
    console.error(error.message);
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 RiftScope rodando na porta ${PORT}`);
});
