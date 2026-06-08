import { Queue } from 'bullmq';

import type { NotificationType } from '@/db/drizzle/schema/notification/enums/notification-type.enum';
import type { NotificationPayload } from '@/db/drizzle/schema/notification/types/payload.type';
import { bullConnection } from './connection';

export const NOTIFICATION_QUEUE = 'notifications';

export interface NotificationJobData {
  userUid: string;
  type: NotificationType;
  title: string;
  message?: string;
  payload?: NotificationPayload;
}

export const notificationQueue = new Queue<NotificationJobData>(NOTIFICATION_QUEUE, {
  connection: bullConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});

export const enqueueNotification = (data: NotificationJobData) =>
  notificationQueue.add('notification', data);
