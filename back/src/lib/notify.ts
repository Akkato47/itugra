import { enqueueNotification } from '@/queue/notification.queue';
import type { NotificationJobData } from '@/queue/notification.queue';
import { logger } from '@/lib/loger';

export const notifyUser = async (job: NotificationJobData) => {
  try {
    await enqueueNotification(job);
  } catch (error) {
    logger.error(`enqueue notification failed: ${error?.message ?? error}`);
  }
};
