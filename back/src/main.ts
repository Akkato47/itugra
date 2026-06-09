import cors from 'cors';
import router from './modules/main.router';

import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import config from './config';
import { logger, LoggerStream } from './lib/loger';
import { CustomError } from './utils/custom_error';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import type http from 'http';
import morgan from 'morgan';
import { initSocket } from './realtime/socket';
import { startNotificationWorker } from './queue/notification.worker';

export const app = express();
const port = config.app.port;

export const DI = {} as {
  server: http.Server;
};

export const init = (async () => {
  swaggerDocument.host = config.app.isProduction
    ? config.app.productionUrl
    : `localhost:${port}`;

  app.use(cors(config.cors));
  app.use(express.json());
  // @ts-ignore
  app.use(cookieParser());
  app.use(morgan('dev', { stream: new LoggerStream() }));
  app.use('/api', router);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new CustomError(404, `endpoint ${_req.path} not found`));
  });

  app.use(
    (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof CustomError) {
        logger.warn(`${err.statusCode} ${err.message}`);
        return res
          .status(err.statusCode)
          .json({ success: false, message: err.message });
      }

      logger.error((err as Error)?.stack ?? err);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error.' });
    }
  );

  DI.server = app.listen(port, () => logger.info(`listening in port:${port}`));

  initSocket(DI.server);
  startNotificationWorker();
})();
