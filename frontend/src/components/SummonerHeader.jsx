import { tierColor } from '../utils/rankColors';

function SummonerHeader({ summoner }) {
  if (!summoner) return null;
  const { wins, losses, tier, division, lp } = summoner.rank;
  const total = wins + losses;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  const color = tierColor(tier);

  return (
    <div className="rs-summoner-banner">
      <div className="rs-summoner-banner-glow" style={{ background: `radial-gradient(circle, ${color}33, transparent 70%)` }} />

      <div className="rs-summoner-identity">
        <div className="rs-summoner-icon-ring" style={{ boxShadow: `0 0 0 2px ${color}` }}>
          <img src={summoner.profileIconUrl} alt="ícone de invocador" className="rs-profile-icon" />
          <span className="rs-summoner-level-badge">{summoner.summonerLevel}</span>
        </div>

        <div className="rs-summoner-names">
          <h2 className="rs-summoner-name">
            {summoner.gameName}<span className="rs-tag">#{summoner.tagLine}</span>
          </h2>
          {summoner.resolvedPlatform && (
            <span className="rs-summoner-platform">{summoner.resolvedPlatform.toUpperCase()}</span>
          )}
        </div>
      </div>

      <div className="rs-summoner-rank-block">
        <div className="rs-rank-pill" style={{ borderColor: color, color }}>
          {tier}{division ? ` ${division}` : ''}
        </div>
        <span className="rs-rank-lp">{lp} PDL</span>

        {total > 0 && (
          <div className="rs-winrate">
            <div className="rs-winrate-bar">
              <div className="rs-winrate-fill-win" style={{ width: `${winRate}%` }} />
              <div className="rs-winrate-fill-loss" style={{ width: `${100 - winRate}%` }} />
            </div>
            <span className="rs-winrate-label">
              {wins}V {losses}D <strong>({winRate}%)</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummonerHeader;