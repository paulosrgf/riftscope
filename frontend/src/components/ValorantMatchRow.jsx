import { useState } from "react";
import { fetchValorantMatchDetail } from "../services/valorantApi";
import ValorantMatchDetail from "./ValorantMatchDetail";
import { IconChevron } from "./icons";
import { timeAgo } from "../utils/format";

function ValorantMatchRow({ match, onPlayerClick }) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  async function toggle() {
    if (!expanded && !detail) {
      setLoadingDetail(true);
      try {
        setDetail(await fetchValorantMatchDetail(match.matchId));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDetail(false);
      }
    }
    setExpanded((e) => !e);
  }

  const kda =
    match.deaths === 0
      ? "Perfect"
      : ((match.kills + match.assists) / match.deaths).toFixed(2);

  return (
    <div
      className={`rs-match-card ${match.win ? "rs-win" : "rs-loss"} ${expanded ? "rs-match-card--open" : ""}`}
    >
      <button
        className="rs-match-summary rs-match-summary--valorant"
        onClick={toggle}
      >
        <div className="rs-match-result-strip">
          <span className="rs-match-result-text">
            {match.win ? "Vitória" : "Derrota"}
          </span>
          <span className="rs-match-meta">
            {match.map} · {match.mode}
          </span>
          <span className="rs-match-meta">{timeAgo(match.gameCreation)}</span>
        </div>

        <img
          src={match.agentIconUrl}
          alt={match.agentName}
          className="rs-champ-icon"
        />

        <div className="rs-match-kda-block">
          <strong className="rs-match-kda-nums">
            {match.kills}/{match.deaths}/{match.assists}
          </strong>
          <span className="rs-match-kda-ratio">{kda} KDA</span>
        </div>

        <div className="rs-match-quickstats">
          <div>
            <span className="rs-qs-value">{match.acs}</span>
            <span className="rs-qs-label">ACS</span>
          </div>
          <div>
            <span className="rs-qs-value">{match.headshotPercent}%</span>
            <span className="rs-qs-label">HS</span>
          </div>
          <div>
            <span className="rs-qs-value">{match.rating.toFixed(1)}</span>
            <span className="rs-qs-label">Rating</span>
          </div>
        </div>

        <IconChevron className="rs-match-chevron" />
      </button>

      {expanded && (
        <div className="rs-match-detail-wrap">
          {loadingDetail ? (
            <div className="rs-loading">carregando partida...</div>
          ) : (
            detail && (
              <ValorantMatchDetail
                detail={detail}
                onPlayerClick={onPlayerClick}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ValorantMatchRow;
