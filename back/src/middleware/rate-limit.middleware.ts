import type { Request, Response, NextFunction } from 'express';

import redisClient from '@/db/redis';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import { logger } from '@/lib/loger';

interface RateLimitOptions {
  /** Уникальный префикс ключа в Redis, чтобы лимиты разных роутов не пересекались. */
  keyPrefix: string;
  /** Максимум запросов в окне. */
  limit: number;
  /** Длина окна в секундах. */
  windowSeconds: number;
}

/**
 * Фабрика middleware для ограничения частоты запросов на Redis.
 *
 * Счётчик инкрементится атомарно (INCR), TTL ставится при первом запросе окна.
 * Ключ — uid авторизованного пользователя (или IP для анонимных запросов),
 * поэтому лимит защищает от «дабл-кликов» и спама по конкретному пользователю.
 *
 * Если Redis недоступен — запрос НЕ блокируется (fail-open), только логируется.
 */
export const rateLimiter =
  ({ keyPrefix, limit, windowSeconds }: RateLimitOptions) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const identifier = req.user?.uid ?? req.ip ?? 'unknown';
      const key = `ratelimit:${keyPrefix}:${identifier}`;

      const current = await redisClient.INCR(key);
      if (current === 1) {
        await redisClient.EXPIRE(key, windowSeconds);
      }

      if (current > limit) {
        const ttl = await redisClient.TTL(key);
        return next(
          new CustomError(
            HttpStatus.TOO_MANY_REQUESTS,
            `повторите через ${Math.max(ttl, 1)} сек.`
          )
        );
      }

      return next();
    } catch (error) {
      logger.error(`Rate limiter error: ${error}`);
      return next();
    }
  };
