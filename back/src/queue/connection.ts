import config from '@/config';

export const bullConnection = {
  host: config.database.redis.host,
  port: +config.database.redis.port,
  password: config.database.redis.password || undefined,
  maxRetriesPerRequest: null as null,
};
