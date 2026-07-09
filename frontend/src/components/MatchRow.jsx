import { useState } from 'react';
import { fetchMatchDetail } from '../services/api';
import MatchDetail from './MatchDetail';
import { IconChevron } from './icons';
import { timeAgo, formatDuration } from '../utils/format';

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

  const kda = match.deaths === 0 ? 'Perfect' : ((match.kills + match.assists) / match.deaths).toFixed(2);

  return (
    <div className={`rs-match-card ${match.win ? 'rs-win' : 'rs-loss'} ${expanded ? 'rs-match-card--open' : ''}`}>
      <button className="rs-match-summary" onClick={toggle}>
        <div className="rs-match-result-strip">
          <span className="rs-match-result-text">{match.win ? 'Vitória' : 'Derrota'}</span>
          <span className="rs-match-meta">{match.gameMode}</span>
          <span className="rs-match-meta">{timeAgo(match.gameCreation)}</span>
          <span className="rs-match-meta">{formatDuration(match.gameDuration)}</span>
        </div>

        <div className="rs-match-champ-block">
          <img src={match.championIconUrl} alt={match.championName} className="rs-champ-icon" />
          <div className="rs-match-spells-runes">
            <div className="rs-spell-col">
              {match.spellUrls.map((url, i) => <img key={i} src={url} alt="feitiço" className="rs-mini-icon" />)}
            </div>
            <img src={match.runeUrls.primary} alt="runa primária" className="rs-mini-icon" />
          </div>
        </div>

        <div className="rs-match-kda-block">
          <strong className="rs-match-kda-nums">{match.kills}/{match.deaths}/{match.assists}</strong>
          <span className="rs-match-kda-ratio">{kda} KDA</span>
        </div>

        <div className="rs-match-quickstats">
          <div><span className="rs-qs-value">{match.cs}</span><span className="rs-qs-label">CS</span></div>
          <div><span className="rs-qs-value">{(match.goldEarned / 1000).toFixed(1)}k</span><span className="rs-qs-label">Ouro</span></div>
        </div>

        <div className="rs-match-items">
          {match.itemUrls.map((url, i) =>
            url ? <img key={i} src={url} alt="item" className="rs-item-icon" /> : <div key={i} className="rs-item-empty" />
          )}
          <img src={match.trinketUrl} alt="trinket" className="rs-item-icon rs-item-trinket" />
        </div>

        <IconChevron className="rs-match-chevron" />
      </button>

      {expanded && (
        <div className="rs-match-detail-wrap">
          {loadingDetail
            ? <div className="rs-loading">carregando partida...</div>
            : detail && <MatchDetail detail={detail} onSummonerClick={onSummonerClick} />}
        </div>
      )}
    </div>
  );
}

export default MatchRow;