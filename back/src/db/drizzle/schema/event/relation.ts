import { relations } from 'drizzle-orm';
import { eventDocs, eventRequest, hackaton } from './schema';

export const requestRelation = relations(eventRequest, ({ many }) => ({
  eventDocs: many(eventDocs),
}));

export const hackatonRelation = relations(hackaton, ({ many }) => ({
  eventDocs: many(eventDocs),
}));

export const eventDocRelation = relations(eventDocs, ({ one }) => ({
  eventRequests: one(eventRequest, {
    fields: [eventDocs.eventRequestUid],
    references: [eventRequest.uid],
  }),
  hackatons: one(hackaton, {
    fields: [eventDocs.eventUid],
    references: [hackaton.uid],
  }),
}));
