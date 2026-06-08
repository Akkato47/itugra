import Redis from 'ioredis';

import config from '@/config';
import { logger } from '@/lib/loger';

const redisClient = new Redis({
  host: config.database.redis.host,
  port: +config.database.redis.port,
  password: config.database.redis.password || undefined,
});

redisClient.on('error', (err) => logger.error(`Redis Client Error: ${err}`));

export default redisClient;
