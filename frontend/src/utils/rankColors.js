const TIER_COLORS = {
  IRON: '#8d7b6e',
  BRONZE: '#a5673f',
  SILVER: '#9fa8b3',
  GOLD: '#d4af37',
  PLATINUM: '#3fb8a8',
  EMERALD: '#3fbf6d',
  DIAMOND: '#5b8def',
  MASTER: '#b361e0',
  GRANDMASTER: '#e0616f',
  CHALLENGER: '#f2c94c',
  UNRANKED: '#a89fbb',
};

export function tierColor(tier) {
  return TIER_COLORS[tier] || TIER_COLORS.UNRANKED;
}