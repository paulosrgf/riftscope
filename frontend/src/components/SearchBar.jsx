import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "./icons";

function SearchBar({ variant = "hero", game = "lol" }) {
  const [riotId, setRiotId] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const [gameNamePart, tagPart] = riotId.split("#");
  const isValid = gameNamePart?.trim() && tagPart?.trim();

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    const base = game === "valorant" ? "/valorant/player" : "/summoner";
    navigate(
      `${base}/${encodeURIComponent(gameNamePart.trim())}/${encodeURIComponent(tagPart.trim())}`,
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rs-search rs-search--${variant}`}>
      <div className="rs-search-shell">
        <IconSearch className="rs-search-icon" />
        <input
          type="text"
          placeholder="NomeDoJogador#TAG"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          className="rs-search-input"
          aria-label="Buscar jogador pelo Riot ID"
        />
        <button type="submit" className="rs-search-btn">
          {variant === "hero" ? "Invocar" : "Ir"}
        </button>
      </div>
      {touched && !isValid && (
        <p className="rs-search-error">Digite no formato Nome#TAG</p>
      )}
    </form>
  );
}

export default SearchBar;
