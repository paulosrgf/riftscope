const redisClient = require('../config/redis'); // seu client já existente

async function getCached(key) {
  try {
    const val = await redisClient.get(key);
    return val ? JSON.parse(val) : null;
  } catch (err) {
    console.warn('[cache] leitura falhou, seguindo sem cache:', err.message);
    return null;
  }
}

async function setCached(key, value, ttlSeconds) {
  try {
    await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch (err) {
    console.warn('[cache] escrita falhou:', err.message);
  }
}

module.exports = { getCached, setCached };