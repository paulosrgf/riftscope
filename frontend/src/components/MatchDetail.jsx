function ParticipantRow({ p, onSummonerClick }) {
  return (
    <div className="rs-participant-row">
      <img
        src={p.championIconUrl}
        alt={p.championName}
        className="rs-mini-icon"
      />
      <button
        className="rs-summoner-link"
        onClick={() => onSummonerClick(p.gameName, p.tagLine)}
      >
        {p.gameName}#{p.tagLine}
      </button>
      <span>
        {p.kills}/{p.deaths}/{p.assists}
      </span>
      <span>{p.cs} CS</span>
      <div className="rs-match-items">
        {p.itemUrls.map((url, i) =>
          url ? (
            <img key={i} src={url} alt="item" className="rs-item-icon-sm" />
          ) : (
            <div key={i} className="rs-item-empty-sm" />
          ),
        )}
      </div>
    </div>
  );
}

function MatchDetail({ detail, onSummonerClick }) {
  return (
    <div className="rs-match-detail">
      {detail.teams.map((team) => (
        <div
          key={team.teamId}
          className={`rs-team ${team.win ? "rs-team-win" : "rs-team-loss"}`}
        >
          <h4>
            {team.teamId === 100 ? "Time Azul" : "Time Vermelho"} —{" "}
            {team.win ? "Vitória" : "Derrota"}
          </h4>
          {team.participants.map((p) => (
            <ParticipantRow
              key={p.puuid}
              p={p}
              onSummonerClick={onSummonerClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatchDetail;
