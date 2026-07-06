import { useState } from "react";
import { fetchMatchDetail } from "../services/api";
import MatchDetail from "./MatchDetail";

function MatchRow({ match, onSummonerClick }) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  async function toggle() {
    if (!expanded && !detail) {
      setLoadingDetail(true);
      try {
        setDetail(await fetchMatchDetail(match.matchId));
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
    <div className={`rs-match-row ${match.win ? "rs-win" : "rs-loss"}`}>
      <div className="rs-match-summary" onClick={toggle}>
        <img
          src={match.championIconUrl}
          alt={match.championName}
          className="rs-champ-icon"
        />
        <div className="rs-match-spells-runes">
          <div className="rs-spell-row">
            {match.spellUrls.map((url, i) => (
              <img key={i} src={url} alt="feitiço" className="rs-mini-icon" />
            ))}
          </div>
          <img
            src={match.runeUrls.primary}
            alt="runa primária"
            className="rs-mini-icon"
          />
        </div>
        <div className="rs-match-kda">
          <strong>
            {match.kills}/{match.deaths}/{match.assists}
          </strong>
          <span>KDA {kda}</span>
        </div>
        <div className="rs-match-items">
          {match.itemUrls.map((url, i) =>
            url ? (
              <img key={i} src={url} alt="item" className="rs-item-icon" />
            ) : (
              <div key={i} className="rs-item-empty" />
            ),
          )}
          <img src={match.trinketUrl} alt="trinket" className="rs-item-icon" />
        </div>
        <div className="rs-match-result">
          {match.win ? "Vitória" : "Derrota"}
        </div>
      </div>

      {expanded &&
        (loadingDetail ? (
          <div className="rs-loading">carregando partida...</div>
        ) : (
          detail && (
            <MatchDetail detail={detail} onSummonerClick={onSummonerClick} />
          )
        ))}
    </div>
  );
}

export default MatchRow;
