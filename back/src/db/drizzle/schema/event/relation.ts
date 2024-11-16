import { relations } from 'drizzle-orm';
import { eventDocs, eventRequest, event } from './schema';

export const requestRelation = relations(eventRequest, ({ many }) => ({
  eventDocs: many(eventDocs),
}));

export const hackatonRelation = relations(event, ({ many }) => ({
  eventDocs: many(eventDocs),
}));

export const eventDocRelation = relations(eventDocs, ({ one }) => ({
  eventRequests: one(eventRequest, {
    fields: [eventDocs.eventRequestUid],
    references: [eventRequest.uid],
  }),
  hackatons: one(event, {
    fields: [eventDocs.eventUid],
    references: [event.uid],
  }),
}));
