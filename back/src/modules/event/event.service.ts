import { and, asc, eq, gte } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import {
  event,
  eventRegistration,
  eventRequest,
} from '@/db/drizzle/schema/event/schema';
import { ModerationStatus } from '@/db/drizzle/schema/event/enums/moderation-status.enum';
import {
  RegistrationKind,
  RegistrationStatus,
} from '@/db/drizzle/schema/event/enums/registration.enum';
import { StatusEnum } from '@/db/drizzle/schema/event/enums/status.enum';
import { users } from '@/db/drizzle/schema/user/schema';
import { team } from '@/db/drizzle/schema/team/schema';
import {
  customTeamRole,
  userTeamRole,
} from '@/db/drizzle/schema/team/schema';
import { Abilities } from '@/db/drizzle/schema/team/enum/ability.enum';
import { NotificationType } from '@/db/drizzle/schema/notification/enums/notification-type.enum';
import config from '@/config';
import { logger } from '@/lib/loger';
import { createGigaChatClient, extractJson } from '@/lib/gigachat';
import { notifyUser } from '@/lib/notify';
import { emitToUser } from '@/realtime/socket';
import { enqueueEventModeration } from '@/queue/event-moderation.queue';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import type { CreateRequestDto, MakeDecisions } from './dto/request.dto';
import type { RegisterTeamDto } from './dto/register.dto';

const emitModeration = (uid: string, payload: unknown) => {
  emitToUser(uid, 'event:moderation', payload);
};

const emitRegistration = (uid: string, payload: unknown) => {
  emitToUser(uid, 'event:registration', payload);
};

const getTeamAbilities = async (userUid: string, teamUid: string) => {
  const rows = await db
    .select({ abilities: customTeamRole.abilities })
    .from(userTeamRole)
    .innerJoin(customTeamRole, eq(customTeamRole.uid, userTeamRole.ctrUid))
    .where(
      and(eq(userTeamRole.userUid, userUid), eq(userTeamRole.teamUid, teamUid))
    );

  return rows[0]?.abilities ?? null;
};

const assertOpenForRegistration = (target: {
  status: StatusEnum;
  registrationEnd: string;
}) => {
  if (target.status !== StatusEnum.WAITING) {
    throw new CustomError(HttpStatus.CONFLICT, 'Регистрация на мероприятие закрыта');
  }

  if (new Date(target.registrationEnd).getTime() < Date.now()) {
    throw new CustomError(HttpStatus.CONFLICT, 'Срок регистрации истёк');
  }
};

export const getRequests = async () => {
  try {
    return await db
      .select({
        uid: eventRequest.uid,
        name: eventRequest.name,
        type: eventRequest.type,
        approved: eventRequest.approved,
        watched: eventRequest.watched,
        moderationStatus: eventRequest.moderationStatus,
        moderationReason: eventRequest.moderationReason,
        image: eventRequest.image,
        userName: users.fullName,
        description: eventRequest.description,
        categoryId: eventRequest.categoryId,
      })
      .from(eventRequest)
      .leftJoin(users, eq(users.uid, eventRequest.userUid));
  } catch (error) {
    logger.error(`event.service getRequests: ${error?.message ?? error}`);
    throw error;
  }
};

export const getRequest = async (requestUid: string) => {
  try {
    const rows = await db
      .select({
        uid: eventRequest.uid,
        name: eventRequest.name,
        type: eventRequest.type,
        approved: eventRequest.approved,
        watched: eventRequest.watched,
        moderationStatus: eventRequest.moderationStatus,
        moderationReason: eventRequest.moderationReason,
        image: eventRequest.image,
        userName: users.fullName,
        description: eventRequest.description,
        categoryId: eventRequest.categoryId,
      })
      .from(eventRequest)
      .where(eq(eventRequest.uid, requestUid))
      .leftJoin(users, eq(users.uid, eventRequest.userUid));

    return rows[0];
  } catch (error) {
    logger.error(`event.service getRequest: ${error?.message ?? error}`);
    throw error;
  }
};

export const getEvent = async (eventUid: string) => {
  try {
    const rows = await db
      .select({
        uid: event.uid,
        name: event.name,
        type: event.type,
        status: event.status,
        image: event.image,
        userName: users.fullName,
        description: event.description,
        registrationEnd: event.registrationEnd,
        end: event.end,
        categoryId: event.categoryId,
      })
      .from(event)
      .where(eq(event.uid, eventUid))
      .leftJoin(users, eq(users.uid, event.userUid));

    return rows[0];
  } catch (error) {
    logger.error(`event.service getEvent: ${error?.message ?? error}`);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    return await db
      .select({
        uid: event.uid,
        name: event.name,
        type: event.type,
        status: event.status,
        image: event.image,
        userName: users.fullName,
        description: event.description,
        registrationEnd: event.registrationEnd,
        end: event.end,
        categoryId: event.categoryId,
      })
      .from(event)
      .leftJoin(users, eq(users.uid, event.userUid));
  } catch (error) {
    logger.error(`event.service getEvents: ${error?.message ?? error}`);
    throw error;
  }
};

export const getUpcoming = async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    return await db
      .select({
        uid: event.uid,
        name: event.name,
        type: event.type,
        status: event.status,
        image: event.image,
        userName: users.fullName,
        description: event.description,
        registrationEnd: event.registrationEnd,
        end: event.end,
        categoryId: event.categoryId,
      })
      .from(event)
      .where(
        and(
          eq(event.status, StatusEnum.WAITING),
          gte(event.registrationEnd, today)
        )
      )
      .leftJoin(users, eq(users.uid, event.userUid))
      .orderBy(asc(event.registrationEnd));
  } catch (error) {
    logger.error(`event.service getUpcoming: ${error?.message ?? error}`);
    throw error;
  }
};

export const getMyRequests = async (userUid: string) => {
  try {
    return await db
      .select({
        uid: eventRequest.uid,
        name: eventRequest.name,
        type: eventRequest.type,
        description: eventRequest.description,
        image: eventRequest.image,
        moderationStatus: eventRequest.moderationStatus,
        moderationReason: eventRequest.moderationReason,
        registrationEnd: eventRequest.registrationEnd,
        end: eventRequest.end,
        categoryId: eventRequest.categoryId,
      })
      .from(eventRequest)
      .where(eq(eventRequest.userUid, userUid));
  } catch (error) {
    logger.error(`event.service getMyRequests: ${error?.message ?? error}`);
    throw error;
  }
};

export const createRequest = async (userUid: string, dto: CreateRequestDto) => {
  try {
    const created = await db
      .insert(eventRequest)
      .values({
        ...dto,
        userUid,
        approved: false,
        watched: false,
        moderationStatus: ModerationStatus.PENDING,
      })
      .returning();

    await enqueueEventModeration({ requestUid: created[0].uid });

    return {
      createdRequestUid: created[0].uid,
      moderationStatus: ModerationStatus.PENDING,
    };
  } catch (error) {
    logger.error(`event.service createRequest: ${error?.message ?? error}`);
    throw error;
  }
};

export const runModeration = async (requestUid: string) => {
  const rows = await db
    .select()
    .from(eventRequest)
    .where(eq(eventRequest.uid, requestUid));
  const request = rows[0];

  if (!request) {
    logger.warn(`runModeration: request ${requestUid} not found`);
    return;
  }

  if (request.moderationStatus !== ModerationStatus.PENDING) {
    return;
  }

  const systemPrompt = [
    'Ты — модератор платформы хакатонов и митапов.',
    'Тебе дают название, тип и описание мероприятия.',
    'Реши, допустимо ли оно к публикации.',
    'Отклоняй: спам, оскорбления, мошенничество, нелегальный или неэтичный контент, бессмысленный набор символов.',
    'Ответ строго в формате JSON без markdown:',
    '{"decision":"APPROVE","reason":"краткая причина на русском"}',
    'decision принимает только значения "APPROVE" или "REJECT".',
  ].join('\n');

  const userPrompt = [
    `Название: ${request.name}`,
    `Тип: ${request.type}`,
    `Описание: ${request.description ?? '—'}`,
  ].join('\n');

  const gigachat = createGigaChatClient();
  await gigachat.createToken();
  const response = await gigachat.completion({
    model: config.gigachat.model,
    temperature: 0.2,
    max_tokens: 512,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  const raw = response.choices[0]?.message?.content;
  logger.info(`[moderation] request=${requestUid} raw=${raw}`);

  const verdict = extractJson<{ decision: string; reason: string }>(raw);
  const approved = `${verdict?.decision ?? ''}`.toUpperCase() === 'APPROVE';
  const reason = `${verdict?.reason ?? ''}`.trim().slice(0, 1000);

  const updated = await db
    .update(eventRequest)
    .set({
      watched: true,
      approved,
      moderationStatus: approved
        ? ModerationStatus.APPROVED
        : ModerationStatus.REJECTED,
      moderationReason: reason,
    })
    .where(eq(eventRequest.uid, requestUid))
    .returning();

  const { uid, createdAt, updatedAt, watched, approved: _a, moderationStatus, moderationReason, ...base } = updated[0];

  if (!approved) {
    emitModeration(request.userUid, {
      requestUid,
      status: ModerationStatus.REJECTED,
      reason,
    });
    await notifyUser({
      userUid: request.userUid,
      type: NotificationType.EVENT,
      title: 'Мероприятие отклонено',
      message: reason || 'Модерация отклонила ваше мероприятие',
      payload: { requestUid },
    });
    return;
  }

  const createdEvent = await db
    .insert(event)
    .values({ ...base, requestUid })
    .returning();

  emitModeration(request.userUid, {
    requestUid,
    status: ModerationStatus.APPROVED,
    eventUid: createdEvent[0].uid,
  });
  await notifyUser({
    userUid: request.userUid,
    type: NotificationType.EVENT,
    title: 'Мероприятие одобрено',
    message: `«${request.name}» опубликовано`,
    payload: { eventUid: createdEvent[0].uid, eventName: request.name },
  });
};

export const makeDecisions = async (_userUid: string, dto: MakeDecisions) => {
  try {
    const updated = await db
      .update(eventRequest)
      .set({
        approved: dto.decision,
        watched: true,
        moderationStatus: dto.decision
          ? ModerationStatus.APPROVED
          : ModerationStatus.REJECTED,
        moderationReason: dto.decision ? null : 'Отклонено администратором',
      })
      .where(eq(eventRequest.uid, dto.requestUid))
      .returning();

    if (updated.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Заявка не найдена');
    }

    const request = updated[0];
    const published = await db
      .select({ uid: event.uid })
      .from(event)
      .where(eq(event.requestUid, dto.requestUid));

    if (!dto.decision) {
      if (published.length > 0) {
        await db.delete(event).where(eq(event.requestUid, dto.requestUid));
      }

      emitModeration(request.userUid, {
        requestUid: dto.requestUid,
        status: ModerationStatus.REJECTED,
      });
      await notifyUser({
        userUid: request.userUid,
        type: NotificationType.EVENT,
        title: 'Мероприятие отклонено',
        message: 'Администратор отклонил ваше мероприятие',
        payload: { requestUid: dto.requestUid },
      });

      return { message: 'Event declined' };
    }

    if (published.length > 0) {
      return { createdEvent: published[0].uid };
    }

    const { uid, createdAt, updatedAt, watched, approved, moderationStatus, moderationReason, ...base } =
      request;

    const createdEvent = await db
      .insert(event)
      .values({ ...base, requestUid: dto.requestUid })
      .returning();

    emitModeration(request.userUid, {
      requestUid: dto.requestUid,
      status: ModerationStatus.APPROVED,
      eventUid: createdEvent[0].uid,
    });
    await notifyUser({
      userUid: request.userUid,
      type: NotificationType.EVENT,
      title: 'Мероприятие одобрено',
      message: `«${request.name}» опубликовано`,
      payload: { eventUid: createdEvent[0].uid, eventName: request.name },
    });

    return { createdEvent: createdEvent[0].uid };
  } catch (error) {
    logger.error(`event.service makeDecisions: ${error?.message ?? error}`);
    throw error;
  }
};

const loadOpenEvent = async (eventUid: string) => {
  const rows = await db.select().from(event).where(eq(event.uid, eventUid));

  if (rows.length === 0) {
    throw new CustomError(HttpStatus.NOT_FOUND, 'Мероприятие не найдено');
  }

  assertOpenForRegistration(rows[0]);
  return rows[0];
};

export const registerSolo = async (userUid: string, eventUid: string) => {
  try {
    const target = await loadOpenEvent(eventUid);

    const existing = await db
      .select({ uid: eventRegistration.uid })
      .from(eventRegistration)
      .where(
        and(
          eq(eventRegistration.eventUid, eventUid),
          eq(eventRegistration.userUid, userUid)
        )
      );

    if (existing.length > 0) {
      throw new CustomError(HttpStatus.CONFLICT, 'Вы уже зарегистрированы');
    }

    const created = await db
      .insert(eventRegistration)
      .values({
        eventUid,
        userUid,
        kind: RegistrationKind.SOLO,
        status: RegistrationStatus.REGISTERED,
      })
      .returning();

    emitRegistration(target.userUid, { eventUid, at: Date.now() });

    return { registrationUid: created[0].uid };
  } catch (error) {
    logger.error(`event.service registerSolo: ${error?.message ?? error}`);
    throw error;
  }
};

export const registerTeam = async (userUid: string, dto: RegisterTeamDto) => {
  try {
    const target = await loadOpenEvent(dto.eventUid);

    const abilities = await getTeamAbilities(userUid, dto.teamUid);
    if (!abilities) {
      throw new CustomError(HttpStatus.FORBIDDEN, 'Вы не состоите в этой команде');
    }
    if (
      !abilities.includes(Abilities.ALL) &&
      !abilities.includes(Abilities.EVENTREG)
    ) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        'Недостаточно прав для регистрации команды'
      );
    }

    const existing = await db
      .select({ uid: eventRegistration.uid })
      .from(eventRegistration)
      .where(
        and(
          eq(eventRegistration.eventUid, dto.eventUid),
          eq(eventRegistration.teamUid, dto.teamUid)
        )
      );

    if (existing.length > 0) {
      throw new CustomError(HttpStatus.CONFLICT, 'Команда уже зарегистрирована');
    }

    const created = await db
      .insert(eventRegistration)
      .values({
        eventUid: dto.eventUid,
        userUid,
        teamUid: dto.teamUid,
        kind: RegistrationKind.TEAM,
        status: RegistrationStatus.REGISTERED,
      })
      .returning();

    emitRegistration(target.userUid, { eventUid: dto.eventUid, at: Date.now() });

    const members = await db
      .select({ userUid: userTeamRole.userUid })
      .from(userTeamRole)
      .where(eq(userTeamRole.teamUid, dto.teamUid));

    for (const member of members) {
      await notifyUser({
        userUid: member.userUid,
        type: NotificationType.EVENT,
        title: 'Команда зарегистрирована',
        message: `Ваша команда участвует в «${target.name}»`,
        payload: { eventUid: dto.eventUid, eventName: target.name },
      });
    }

    return { registrationUid: created[0].uid };
  } catch (error) {
    logger.error(`event.service registerTeam: ${error?.message ?? error}`);
    throw error;
  }
};

export const cancelRegistration = async (
  userUid: string,
  registrationUid: string
) => {
  try {
    const rows = await db
      .select()
      .from(eventRegistration)
      .where(eq(eventRegistration.uid, registrationUid));
    const registration = rows[0];

    if (!registration) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Регистрация не найдена');
    }

    if (registration.userUid !== userUid) {
      throw new CustomError(HttpStatus.FORBIDDEN, 'Это не ваша регистрация');
    }

    await db
      .delete(eventRegistration)
      .where(eq(eventRegistration.uid, registrationUid));

    const owner = await db
      .select({ userUid: event.userUid })
      .from(event)
      .where(eq(event.uid, registration.eventUid));

    if (owner[0]) {
      emitRegistration(owner[0].userUid, {
        eventUid: registration.eventUid,
        at: Date.now(),
      });
    }

    return { message: 'Регистрация отменена' };
  } catch (error) {
    logger.error(`event.service cancelRegistration: ${error?.message ?? error}`);
    throw error;
  }
};

export const getEventParticipants = async (eventUid: string) => {
  try {
    return await db
      .select({
        registrationUid: eventRegistration.uid,
        kind: eventRegistration.kind,
        userUid: eventRegistration.userUid,
        userName: users.fullName,
        userTag: users.tag,
        teamUid: eventRegistration.teamUid,
        teamName: team.name,
      })
      .from(eventRegistration)
      .where(
        and(
          eq(eventRegistration.eventUid, eventUid),
          eq(eventRegistration.status, RegistrationStatus.REGISTERED)
        )
      )
      .leftJoin(users, eq(users.uid, eventRegistration.userUid))
      .leftJoin(team, eq(team.uid, eventRegistration.teamUid));
  } catch (error) {
    logger.error(`event.service getEventParticipants: ${error?.message ?? error}`);
    throw error;
  }
};

export const getMyRegistrations = async (userUid: string) => {
  try {
    return await db
      .select({
        registrationUid: eventRegistration.uid,
        kind: eventRegistration.kind,
        teamUid: eventRegistration.teamUid,
        teamName: team.name,
        eventUid: event.uid,
        eventName: event.name,
        eventStatus: event.status,
        registrationEnd: event.registrationEnd,
        end: event.end,
      })
      .from(eventRegistration)
      .where(
        and(
          eq(eventRegistration.userUid, userUid),
          eq(eventRegistration.status, RegistrationStatus.REGISTERED)
        )
      )
      .innerJoin(event, eq(event.uid, eventRegistration.eventUid))
      .leftJoin(team, eq(team.uid, eventRegistration.teamUid));
  } catch (error) {
    logger.error(`event.service getMyRegistrations: ${error?.message ?? error}`);
    throw error;
  }
};
