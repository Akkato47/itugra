import { db } from '@/db/drizzle/connect';
import { CreateRequestDto, MakeDecisions } from './dto/request.dto';
import {
  eventDocs,
  eventRequest,
  event,
} from '@/db/drizzle/schema/event/schema';
import { eq } from 'drizzle-orm';
import { EventEnum } from '@/db/drizzle/schema/event/enums/event-types.enum';
import { users } from '@/db/drizzle/schema/user/schema';

export const getRequests = async () => {
  try {
    const requests = await db
      .select({
        uid: eventRequest.uid,
        name: eventRequest.name,
        type: eventRequest.type,
        approved: eventRequest.approved,
        image: eventRequest.image,
        watched: eventRequest.watched,
        userName: users.fullName,
        description: eventRequest.description,
        categoryId: eventRequest.categoryId,
      })
      .from(eventRequest)
      .leftJoin(users, eq(users.uid, eventRequest.userUid));

    return requests;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getRequest = async (requstUid: string) => {
  try {
    const requests = await db
      .select({
        uid: eventRequest.uid,
        name: eventRequest.name,
        type: eventRequest.type,
        approved: eventRequest.approved,
        image: eventRequest.image,
        watched: eventRequest.watched,
        userName: users.fullName,
        description: eventRequest.description,
        categoryId: eventRequest.categoryId,
      })
      .from(eventRequest)
      .where(eq(eventRequest.uid, requstUid))
      .leftJoin(users, eq(users.uid, eventRequest.userUid));

    return requests[0];
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (eventUid: string) => {
  try {
    const events = await db
      .select({
        uid: event.uid,
        name: event.name,
        type: event.type,
        image: event.image,
        userName: users.fullName,
        description: event.description,
        categoryId: event.categoryId,
      })
      .from(event)
      .where(eq(event.uid, eventUid))
      .leftJoin(users, eq(users.uid, event.userUid));

    return events[0];
  } catch (error) {
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const events = await db
      .select({
        uid: event.uid,
        name: event.name,
        type: event.type,
        image: event.image,
        userName: users.fullName,
        description: event.description,
        categoryId: event.categoryId,
      })
      .from(event)
      .leftJoin(users, eq(users.uid, event.userUid));

    return events;
  } catch (error) {
    throw error;
  }
};

export const createRequest = async (userUid: string, dto: CreateRequestDto) => {
  try {
    const newRequest = await db
      .insert(eventRequest)
      .values({ ...dto, userUid, approved: false })
      .returning();
    return {
      createdRequestUid: newRequest[0].uid,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const makeDecisions = async (userUid: string, dto: MakeDecisions) => {
  try {
    const request = await db
      .update(eventRequest)
      .set({ approved: dto.decision, watched: true })
      .where(eq(eventRequest.uid, dto.requestUid))
      .returning();
    const { createdAt, updatedAt, uid, watched, ...rest } = request[0];
    if (dto.decision) {
      const newEvent = await db.insert(event).values(rest).returning();
      return {
        createdEvent: newEvent[0].uid,
      };
    }
    return { message: 'Event declined' };
  } catch (error) {
    throw error;
  }
};
