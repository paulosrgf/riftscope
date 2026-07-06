import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSummoner, fetchMatchHistory } from "../services/api";
import SummonerHeader from "../components/SummonerHeader";
import MatchRow from "../components/MatchRow";

function SummonerProfile() {
  const { gameName, tagLine } = useParams();
  const navigate = useNavigate();
  const [summoner, setSummoner] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchSummoner(gameName, tagLine),
      fetchMatchHistory(gameName, tagLine),
    ])
      .then(([summonerData, matchData]) => {
        setSummoner(summonerData);
        setMatches(matchData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [gameName, tagLine]);

  function goToSummoner(name, tag) {
    navigate(
      `/summoner/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    );
  }

  if (loading) return <div className="rs-loading">carregando...</div>;
  if (error) return <div className="rs-error">{error}</div>;

  return (
    <div className="rs-profile">
      <SummonerHeader summoner={summoner} />
      <div className="rs-match-list">
        {matches.map((match) => (
          <MatchRow
            key={match.matchId}
            match={match}
            onSummonerClick={goToSummoner}
          />
        ))}
      </div>
    </div>
  );
}

export default SummonerProfile;
