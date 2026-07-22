// Rating de impacto exclusivo do RiftScope — não é uma métrica oficial da Riot,
// é uma combinação ponderada de combate (ACS), eficiência (KDA por rodada),
// mira (HS%) e presença de abertura (first bloods). Escala de 0 a 10.
function calculateImpactRating({
  acs,
  kills,
  deaths,
  assists,
  headshotPercent,
  firstBloods,
  roundsPlayed,
}) {
  const rounds = Math.max(roundsPlayed, 1);
  const kdaScore = (kills + assists * 0.5 - deaths * 0.7) / rounds;
  const acsScore = acs / 250;
  const hsScore = headshotPercent / 100;
  const fbScore = firstBloods / rounds;

  const raw = acsScore * 4 + kdaScore * 3 + hsScore * 2 + fbScore * 3;
  const rating = Math.max(0, Math.min(10, raw));
  return Math.round(rating * 10) / 10;
}

module.exports = { calculateImpactRating };
