// Token bucket simples: respeita "X requisições a cada Y ms".
// Ajuste os números conforme os limites reais que aparecem nos headers
// da sua key (X-App-Rate-Limit) — os valores abaixo são o padrão de dev key.
class RateLimiter {
  constructor({ maxPerSecond = 18, maxPerTwoMin = 90 } = {}) {
    this.queue = [];
    this.secondBucket = [];
    this.twoMinBucket = [];
    this.maxPerSecond = maxPerSecond;
    this.maxPerTwoMin = maxPerTwoMin;
    this.processing = false;
  }

  _cleanup(now) {
    this.secondBucket = this.secondBucket.filter((t) => now - t < 1000);
    this.twoMinBucket = this.twoMinBucket.filter((t) => now - t < 120000);
  }

  schedule(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this._process();
    });
  }

  async _process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      this._cleanup(now);

      if (this.secondBucket.length >= this.maxPerSecond || this.twoMinBucket.length >= this.maxPerTwoMin) {
        await new Promise((r) => setTimeout(r, 100));
        continue;
      }

      const { fn, resolve, reject } = this.queue.shift();
      this.secondBucket.push(now);
      this.twoMinBucket.push(now);

      try {
        resolve(await fn());
      } catch (err) {
        // Se a Riot mandar 429, espera o Retry-After e recoloca na fila
        if (err.response?.status === 429) {
          const retryAfter = parseInt(err.response.headers['retry-after'] || '1', 10);
          console.warn(`[rateLimiter] 429 recebido, aguardando ${retryAfter}s`);
          this.queue.unshift({ fn, resolve, reject });
          await new Promise((r) => setTimeout(r, retryAfter * 1000));
        } else {
          reject(err);
        }
      }
    }   
    this.processing = false;
  }
}

module.exports = new RateLimiter();