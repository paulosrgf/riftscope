function ScoreboardRow({ p, onSummonerClick, isSearchedPlayer }) {
  const kda = p.deaths === 0 ? 'Perfect' : ((p.kills + p.assists) / p.deaths).toFixed(2);
  const kdaClass =
    kda === 'Perfect' || parseFloat(kda) >= 4 ? 'rs-kda-good'
      : parseFloat(kda) >= 2 ? 'rs-kda-avg'
      : 'rs-kda-bad';

  return (
    <div className={`rs-scoreboard-row ${isSearchedPlayer ? 'rs-scoreboard-row--me' : ''}`}>
      <div className="rs-sb-champion">
        <div className="rs-sb-champ-wrap">
          <img src={p.championIconUrl} alt={p.championName} className="rs-sb-champ-icon" />
          <span className="rs-sb-champ-level">{p.championLevel}</span>
        </div>
        <div className="rs-sb-spells-runes">
          {p.spellUrls.map((url, i) => (
            <img key={i} src={url} alt="feitiço de invocador" className="rs-sb-mini" />
          ))}
          <img src={p.runeUrls.primary} alt="runa primária" className="rs-sb-mini" />
        </div>
      </div>

      <button className="rs-sb-player" onClick={() => onSummonerClick(p.gameName, p.tagLine)}>
        <span className="rs-sb-player-name">{p.gameName}</span>
        <span className="rs-sb-player-tag">#{p.tagLine}</span>
      </button>

      <div className={`rs-sb-kda ${kdaClass}`}>
        <span className="rs-sb-kda-nums">{p.kills}/{p.deaths}/{p.assists}</span>
        <span className="rs-sb-kda-ratio">{kda} KDA</span>
      </div>

      <div className="rs-sb-stat">
        <span className="rs-sb-stat-value">{p.cs}</span>
        <span className="rs-sb-stat-label">CS</span>
      </div>

      <div className="rs-sb-stat">
        <span className="rs-sb-stat-value">{p.totalDamageDealtToChampions.toLocaleString('pt-BR')}</span>
        <span className="rs-sb-stat-label">dano</span>
      </div>

      <div className="rs-sb-stat">
        <span className="rs-sb-stat-value">{(p.goldEarned / 1000).toFixed(1)}k</span>
        <span className="rs-sb-stat-label">ouro</span>
      </div>

      <div className="rs-sb-items">
        {p.itemUrls.map((url, i) =>
          url
            ? <img key={i} src={url} alt="item" className="rs-sb-item" />
            : <div key={i} className="rs-sb-item-empty" />
        )}
        <img src={p.trinketUrl} alt="trinket" className="rs-sb-item rs-sb-trinket" />
      </div>
    </div>
  );
}

function TeamBlock({ team, onSummonerClick }) {
  return (
    <div className="rs-sb-team">
      <div className={`rs-sb-team-header ${team.win ? 'rs-sb-team-header--win' : 'rs-sb-team-header--loss'}`}>
        <span>{team.teamId === 100 ? 'Time Azul' : 'Time Vermelho'}</span>
        <span className="rs-sb-team-result">{team.win ? 'Vitória' : 'Derrota'}</span>
      </div>
      <div className="rs-sb-column-labels">
        <span />
        <span>Jogador</span>
        <span>KDA</span>
        <span>CS</span>
        <span>Dano</span>
        <span>Ouro</span>
        <span>Itens</span>
      </div>
      {team.participants.map((p) => (
        <ScoreboardRow key={p.puuid} p={p} onSummonerClick={onSummonerClick} />
      ))}
    </div>
  );
}

function MatchDetail({ detail, onSummonerClick }) {
  return (
    <div className="rs-match-detail">
      {detail.teams.map((team) => (
        <TeamBlock key={team.teamId} team={team} onSummonerClick={onSummonerClick} />
      ))}
    </div>
  );
}

export default MatchDetail;