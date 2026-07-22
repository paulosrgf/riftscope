function ScoreboardRow({ p, onPlayerClick }) {
  const kda =
    p.deaths === 0 ? "Perfect" : ((p.kills + p.assists) / p.deaths).toFixed(2);

  return (
    <div className="rs-scoreboard-row rs-scoreboard-row--valorant">
      <img
        src={p.agentIconUrl}
        alt={p.agentName}
        className="rs-sb-champ-icon"
      />

      <button
        className="rs-sb-player"
        onClick={() => onPlayerClick(p.gameName, p.tagLine)}
      >
        <span className="rs-sb-player-name">{p.gameName}</span>
        <span className="rs-sb-player-tag">#{p.tagLine}</span>
      </button>

      <div className="rs-sb-kda">
        <span className="rs-sb-kda-nums">
          {p.kills}/{p.deaths}/{p.assists}
        </span>
        <span className="rs-sb-kda-ratio">{kda} KDA</span>
      </div>

      <div className="rs-sb-stat">
        <span className="rs-sb-stat-value">{p.acs}</span>
        <span className="rs-sb-stat-label">ACS</span>
      </div>
      <div className="rs-sb-stat">
        <span className="rs-sb-stat-value">{p.adr}</span>
        <span className="rs-sb-stat-label">ADR</span>
      </div>
      <div className="rs-sb-stat">
        <span className="rs-sb-stat-value">{p.headshotPercent}%</span>
        <span className="rs-sb-stat-label">HS</span>
      </div>
      <div className="rs-sb-stat">
        <span className="rs-sb-stat-value">{p.rating.toFixed(1)}</span>
        <span className="rs-sb-stat-label">Rating</span>
      </div>
    </div>
  );
}

function TeamBlock({ label, won, participants, onPlayerClick }) {
  return (
    <div className="rs-sb-team">
      <div
        className={`rs-sb-team-header ${won ? "rs-sb-team-header--win" : "rs-sb-team-header--loss"}`}
      >
        <span>{label}</span>
        <span className="rs-sb-team-result">{won ? "Vitória" : "Derrota"}</span>
      </div>
      <div className="rs-sb-column-labels rs-sb-column-labels--valorant">
        <span />
        <span>Jogador</span>
        <span>KDA</span>
        <span>ACS</span>
        <span>ADR</span>
        <span>HS%</span>
        <span>Rating</span>
      </div>
      {participants.map((p) => (
        <ScoreboardRow key={p.puuid} p={p} onPlayerClick={onPlayerClick} />
      ))}
    </div>
  );
}

function ValorantMatchDetail({ detail, onPlayerClick }) {
  const attackers = detail.participants.filter((p) => p.teamId === "Attacker");
  const defenders = detail.participants.filter((p) => p.teamId === "Defender");
  const attackersTeam = detail.teams.find((t) => t.teamId === "Attacker");
  const defendersTeam = detail.teams.find((t) => t.teamId === "Defender");

  return (
    <div className="rs-match-detail">
      <TeamBlock
        label="Ataque"
        won={attackersTeam.won}
        participants={attackers}
        onPlayerClick={onPlayerClick}
      />
      <TeamBlock
        label="Defesa"
        won={defendersTeam.won}
        participants={defenders}
        onPlayerClick={onPlayerClick}
      />
    </div>
  );
}

export default ValorantMatchDetail;
