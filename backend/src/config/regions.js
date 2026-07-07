const PLATFORM_TO_REGION = {
  na1: 'americas', br1: 'americas', la1: 'americas', la2: 'americas', oc1: 'americas',
  euw1: 'europe', eun1: 'europe', tr1: 'europe', ru: 'europe',
  kr: 'asia', jp1: 'asia',
};

const REGION_TO_PLATFORMS = {
  americas: ['na1', 'br1', 'la1', 'la2', 'oc1'],
  europe: ['euw1', 'eun1', 'tr1', 'ru'],
  asia: ['kr', 'jp1'],
};

function regionalRouting(platform) {
  return PLATFORM_TO_REGION[platform] || 'americas';
}

function platformsForRegion(region) {
  return REGION_TO_PLATFORMS[region] || REGION_TO_PLATFORMS.americas;
}

module.exports = { regionalRouting, platformsForRegion, PLATFORM_TO_REGION };