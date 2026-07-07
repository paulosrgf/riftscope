const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', err => {
  console.error('Redis error:', err.message);
});

(async () => {
  try {
    await redisClient.connect();
    console.log('⚡ Redis conectado');
  } catch (err) {
    console.warn('⚠ Redis indisponível, usando apenas cache em memória');
  }
})();

module.exports = redisClient;