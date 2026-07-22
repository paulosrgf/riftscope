require("dotenv").config();
console.log(
  "Key carregada:",
  process.env.RIOT_API_KEY
    ? process.env.RIOT_API_KEY.slice(0, 12) + "..."
    : "UNDEFINED",
);
const express = require("express");
const cors = require("cors");

const summonerRoutes = require("./routes/summoner.routes");
const matchRoutes = require("./routes/match.routes");

const valorantRoutes = require("./routes/valorant.routes");
const { loadValorantStatic } = require("./services/valorantStatic");

const { loadStaticData } = require("./services/ddragonStatic");
loadValorantStatic().catch((err) =>
  console.error("Falha ao carregar dados estáticos de Valorant:", err),
);

const app = express();
const PORT = process.env.PORT || 3000;

loadStaticData().catch((err) => {
  console.error("Falha ao carregar dados estáticos:", err);
});

app.use(cors());
app.use(express.json());

app.use("/api/summoner", summonerRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/valorant", valorantRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 RiftScope rodando na porta ${PORT}`);
});
