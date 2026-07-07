import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ variant = 'hero' }) {
  const [riotId, setRiotId] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const [gameNamePart, tagPart] = riotId.split('#');
  const isValid = gameNamePart?.trim() && tagPart?.trim();

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    navigate(`/summoner/${encodeURIComponent(gameNamePart.trim())}/${encodeURIComponent(tagPart.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className={`rs-search rs-search--${variant}`}>
      {variant === 'hero' && <div className="rs-search-arch" aria-hidden="true" />}
      <div className="rs-search-field">
        <input
          type="text"
          placeholder="NomeDoInvocador#TAG"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          className="rs-search-input"
          aria-label="Buscar invocador pelo Riot ID"
        />
        <button type="submit" className="rs-search-btn">
          {variant === 'hero' ? 'Invocar' : 'Ir'}
        </button>
      </div>
      {touched && !isValid && (
        <p className="rs-search-error">Digite no formato Nome#TAG</p>
      )}
    </form>
  );
}

export default SearchBar;