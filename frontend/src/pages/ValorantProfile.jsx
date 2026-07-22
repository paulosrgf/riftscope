import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchValorantPlayer,
  fetchValorantMatchHistory,
} from "../services/valorantApi";
import ValorantPlayerBanner from "../components/ValorantPlayerBanner";
import WeaponStatsPanel from "../components/WeaponStatsPanel";
import ValorantMatchRow from "../components/ValorantMatchRow";

function ValorantProfile() {
  const { gameName, tagLine } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchValorantPlayer(gameName, tagLine),
      fetchValorantMatchHistory(gameName, tagLine),
    ])
      .then(([playerData, matchData]) => {
        setPlayer(playerData);
        setMatches(matchData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [gameName, tagLine]);

  function goToPlayer(name, tag) {
    navigate(
      `/valorant/player/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    );
  }

  if (loading) return <div className="rs-loading">carregando...</div>;
  if (error) return <div className="rs-error">{error}</div>;

  return (
    <div className="rs-profile">
      <ValorantPlayerBanner player={player} />
      <WeaponStatsPanel weaponStats={player.weaponStats} />
      <div className="rs-match-list">
        {matches.map((match) => (
          <ValorantMatchRow
            key={match.matchId}
            match={match}
            onPlayerClick={goToPlayer}
          />
        ))}
      </div>
    </div>
  );
}

export default ValorantProfile;
