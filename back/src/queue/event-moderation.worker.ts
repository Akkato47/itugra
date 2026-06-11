import { Worker } from 'bullmq';

import { logger } from '@/lib/loger';
import { runModeration } from '@/modules/event/event.service';
import { bullConnection } from './connection';
import { EVENT_MODERATION_QUEUE } from './event-moderation.queue';
import type { EventModerationJobData } from './event-moderation.queue';

let worker: Worker<EventModerationJobData> | undefined;

export const startEventModerationWorker = () => {
  if (worker) {
    return worker;
  }

  worker = new Worker<EventModerationJobData>(
    EVENT_MODERATION_QUEUE,
    async (job) => {
      await runModeration(job.data.requestUid);
    },
    { connection: bullConnection }
  );

  worker.on('failed', (job, error) => {
    logger.error(`event moderation job ${job?.id} failed: ${error.message}`);
  });

  return worker;
};
