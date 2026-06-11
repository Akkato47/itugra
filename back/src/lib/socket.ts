import type http from 'http';
import { Server } from 'socket.io';

import config from '@/config';
import { logger } from '@/lib/loger';
import token from '@/modules/auth/lib/token';

const ACCESS_COOKIE = 'starter-access-token';

let io: Server | undefined;

const getCookie = (raw: string | undefined, name: string): string | undefined => {
  if (!raw) {
    return undefined;
  }

  const target = raw
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return target ? decodeURIComponent(target.slice(name.length + 1)) : undefined;
};

export const roomForUser = (uid: string) => `user:${uid}`;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: config.cors.origin as string[],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const accessToken = getCookie(socket.handshake.headers.cookie, ACCESS_COOKIE);

    if (!accessToken) {
      return next(new Error('unauthorized'));
    }

    const decoded = token.verify({ token: accessToken, tokenType: 'access' });

    if (!decoded) {
      return next(new Error('unauthorized'));
    }

    socket.data.uid = decoded.uid;
    return next();
  });

  io.on('connection', (socket) => {
    const uid = socket.data.uid as string;
    socket.join(roomForUser(uid));
    logger.info(`socket connected: ${socket.id} (user ${uid})`);

    socket.on('disconnect', () => {
      logger.info(`socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const emitToUser = (uid: string, event: string, payload: unknown) => {
  if (!io) {
    logger.error('emitToUser called before socket initialization');
    return;
  }

  io.to(roomForUser(uid)).emit(event, payload);
};
