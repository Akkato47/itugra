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
      })
      .from(eventRequest)
      .leftJoin(users, eq(users.uid, eventRequest.userUid));

    return requests;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const events = await db.select().from(event);

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
