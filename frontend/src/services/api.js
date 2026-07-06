// Se usar Vite:
const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3000/api";
// Se usar Create React App, troque a linha acima por:
// const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export async function fetchSummoner(gameName, tagLine) {
  const res = await fetch(
    `${API_BASE}/summoner/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
  );
  if (!res.ok) throw new Error("Invocador não encontrado");
  return res.json();
}

export async function fetchMatchHistory(gameName, tagLine, count = 10) {
  const res = await fetch(
    `${API_BASE}/matches/history/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?count=${count}`,
  );
  if (!res.ok) throw new Error("Erro ao buscar histórico");
  return res.json();
}

export async function fetchMatchDetail(matchId) {
  const res = await fetch(`${API_BASE}/matches/detail/${matchId}`);
  if (!res.ok) throw new Error("Erro ao buscar detalhes da partida");
  return res.json();
}
