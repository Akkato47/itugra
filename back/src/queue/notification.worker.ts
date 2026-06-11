import { Worker } from 'bullmq';

import { logger } from '@/lib/loger';
import { createNotification } from '@/modules/notification/notification.service';
import { emitToUser } from '@/lib/socket';
import { bullConnection } from './connection';
import { NOTIFICATION_QUEUE } from './notification.queue';
import type { NotificationJobData } from './notification.queue';

let worker: Worker<NotificationJobData> | undefined;

export const startNotificationWorker = () => {
  if (worker) {
    return worker;
  }

  worker = new Worker<NotificationJobData>(
    NOTIFICATION_QUEUE,
    async (job) => {
      const notification = await createNotification(job.data);
      emitToUser(notification.userUid, 'notification', notification);
      return notification.uid;
    },
    { connection: bullConnection }
  );

  worker.on('failed', (job, error) => {
    logger.error(`notification job ${job?.id} failed: ${error.message}`);
  });

  return worker;
};
