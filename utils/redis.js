import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    this.client.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err);
    });
  }

  /**
   * Check if the Redis client is alive
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isOpen;
  }

  /**
   * Get the value of a key from Redis
   * @param {string} key
   * @returns {Promise<string>}
   */
  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error('Failed to get value from Redis:', err);
      return null;
    }
  }

  /**
   * Set a value in Redis with an expiration
   * @param {string} key
   * @param {string} value
   * @param {number} duration
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {
        EX: duration
      });
    } catch (err) {
      console.error('Failed to set value in Redis:', err);
    }
  }

  /**
   * Delete a key from Redis
   * @param {string} key
   * @returns {Promise<void>}
   */
  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error('Failed to delete value from Redis:', err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;