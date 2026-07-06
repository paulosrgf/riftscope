function SummonerHeader({ summoner }) {
  if (!summoner) return null;
  return (
    <div className="rs-summoner-header">
      <img
        src={summoner.profileIconUrl}
        alt="ícone de invocador"
        className="rs-profile-icon"
      />
      <div>
        <h2>
          {summoner.gameName}
          <span className="rs-tag">#{summoner.tagLine}</span>
        </h2>
        <p>Nível {summoner.summonerLevel}</p>
        <p className="rs-rank">
          {summoner.rank.tier} {summoner.rank.division || ""} —{" "}
          {summoner.rank.lp} PDL
          <br />
          {summoner.rank.wins}V / {summoner.rank.losses}D
        </p>
      </div>
    </div>
  );
}

export default SummonerHeader;
