const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3000/api";

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const body = await res.json();
      message = body.error || message;
    } catch {
      /* resposta não era JSON */
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchValorantPlayer(gameName, tagLine) {
  const res = await fetch(
    `${API_BASE}/valorant/player/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
  );
  return handleResponse(res);
}

export async function fetchValorantMatchHistory(gameName, tagLine, count = 10) {
  const res = await fetch(
    `${API_BASE}/valorant/matches/history/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?count=${count}`,
  );
  return handleResponse(res);
}

export async function fetchValorantMatchDetail(matchId) {
  const res = await fetch(`${API_BASE}/valorant/matches/detail/${matchId}`);
  return handleResponse(res);
}
