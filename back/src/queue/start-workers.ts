import { logger } from '@/lib/loger';
import { startNotificationWorker } from './notification.worker';
import { startEventModerationWorker } from './event-moderation.worker';

const workerStarters = [
  { name: 'notifications', start: startNotificationWorker },
  { name: 'event-moderation', start: startEventModerationWorker },
];

export const startWorkers = () => {
  for (const { name, start } of workerStarters) {
    start();
    logger.info(`worker started: ${name}`);
  }
};
