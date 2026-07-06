import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [riotId, setRiotId] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const [gameName, tagLine] = riotId.split("#");
    if (!gameName || !tagLine) return;
    navigate(
      `/summoner/${encodeURIComponent(gameName.trim())}/${encodeURIComponent(tagLine.trim())}`,
    );
  }

  return (
    <div className="rs-home">
      <h1 className="rs-logo">RiftScope</h1>
      <p className="rs-tagline">busque um invocador</p>
      <form onSubmit={handleSearch} className="rs-search-form">
        <input
          type="text"
          placeholder="NomeDoJogador#TAG"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          className="rs-search-input"
        />
        <button type="submit" className="rs-search-btn">
          Buscar
        </button>
      </form>
    </div>
  );
}

export default Home;
