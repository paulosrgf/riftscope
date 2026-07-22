function RatingBadge({ rating }) {
  const color = rating >= 7 ? "#7ed957" : rating >= 4.5 ? "#d4af37" : "#e0627a";
  return (
    <div className="rs-rating-badge" style={{ borderColor: color, color }}>
      <span className="rs-rating-value">{rating.toFixed(1)}</span>
      <span className="rs-rating-label">Rating RiftScope</span>
    </div>
  );
}

function ValorantPlayerBanner({ player }) {
  if (!player) return null;
  const { rank, stats } = player;

  return (
    <div className="rs-summoner-banner">
      <div className="rs-summoner-identity">
        {rank.iconUrl && (
          <img
            src={rank.iconUrl}
            alt={rank.tier}
            className="rs-valorant-rank-icon"
          />
        )}
        <div className="rs-summoner-names">
          <h2 className="rs-summoner-name">
            {player.gameName}
            <span className="rs-tag">#{player.tagLine}</span>
          </h2>
          <span className="rs-summoner-platform">
            {rank.tier}
            {rank.division ? ` ${rank.division}` : ""} · {rank.rr} RR
          </span>
        </div>
      </div>

      <RatingBadge rating={stats.overallRating} />

      <div className="rs-valorant-stats-row">
        <div>
          <span className="rs-qs-value">{stats.winRate}%</span>
          <span className="rs-qs-label">Vitórias</span>
        </div>
        <div>
          <span className="rs-qs-value">{stats.kd}</span>
          <span className="rs-qs-label">K/D</span>
        </div>
        <div>
          <span className="rs-qs-value">{stats.avgAcs}</span>
          <span className="rs-qs-label">ACS méd.</span>
        </div>
        <div>
          <span className="rs-qs-value">{stats.avgHs}%</span>
          <span className="rs-qs-label">HS méd.</span>
        </div>
      </div>
    </div>
  );
}

export default ValorantPlayerBanner;
