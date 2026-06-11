import { Queue } from 'bullmq';

import { bullConnection } from './connection';

export const EVENT_MODERATION_QUEUE = 'event-moderation';

export interface EventModerationJobData {
  requestUid: string;
}

export const eventModerationQueue = new Queue<EventModerationJobData>(
  EVENT_MODERATION_QUEUE,
  {
    connection: bullConnection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: 1000,
      removeOnFail: 5000,
    },
  }
);

export const enqueueEventModeration = (data: EventModerationJobData) =>
  eventModerationQueue.add('moderate', data);
