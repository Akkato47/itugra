import { count, eq, ilike, or } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import { users } from '@/db/drizzle/schema/user/schema';
import { team, userTeamRole } from '@/db/drizzle/schema/team/schema';
import {
  event,
  eventRegistration,
  eventRequest,
} from '@/db/drizzle/schema/event/schema';
import { ModerationStatus } from '@/db/drizzle/schema/event/enums/moderation-status.enum';
import { StatusEnum } from '@/db/drizzle/schema/event/enums/status.enum';
import { RoleEnum } from '@/db/drizzle/schema/user/enums/role.enum';
import { TeamTypes } from '@/db/drizzle/schema/team/enum/team-type.enum';
import { removeAllTokensByUid } from '@/modules/auth/jwt.service';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import { logger } from '@/lib/loger';

export const getStats = async () => {
  try {
    const [usersRow] = await db.select({ value: count() }).from(users);
    const [eventsRow] = await db.select({ value: count() }).from(event);
    const [teamsRow] = await db.select({ value: count() }).from(team);
    const [pendingRow] = await db
      .select({ value: count() })
      .from(eventRequest)
      .where(eq(eventRequest.moderationStatus, ModerationStatus.PENDING));
    const [registrationsRow] = await db
      .select({ value: count() })
      .from(eventRegistration);

    return {
      users: usersRow.value,
      events: eventsRow.value,
      teams: teamsRow.value,
      pendingRequests: pendingRow.value,
      registrations: registrationsRow.value,
    };
  } catch (error) {
    logger.error(`admin.service getStats: ${error?.message ?? error}`);
    throw error;
  }
};

export const listUsers = async (search?: string) => {
  try {
    const where = search
      ? or(
          ilike(users.fullName, `%${search}%`),
          ilike(users.tag, `%${search}%`),
          ilike(users.mail, `%${search}%`)
        )
      : undefined;

    return await db
      .select({
        uid: users.uid,
        fullName: users.fullName,
        tag: users.tag,
        mail: users.mail,
        role: users.role,
        image: users.image,
        banned: users.banned,
      })
      .from(users)
      .where(where);
  } catch (error) {
    logger.error(`admin.service listUsers: ${error?.message ?? error}`);
    throw error;
  }
};

export const setUserRole = async (userUid: string, role: RoleEnum) => {
  try {
    if (!Object.values(RoleEnum).includes(role)) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Недопустимая роль');
    }

    const updated = await db
      .update(users)
      .set({ role })
      .where(eq(users.uid, userUid))
      .returning();

    if (updated.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Пользователь не найден');
    }

    return { message: 'Роль обновлена' };
  } catch (error) {
    logger.error(`admin.service setUserRole: ${error?.message ?? error}`);
    throw error;
  }
};

export const setUserBan = async (userUid: string, banned: boolean) => {
  try {
    const updated = await db
      .update(users)
      .set({ banned })
      .where(eq(users.uid, userUid))
      .returning();

    if (updated.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Пользователь не найден');
    }

    if (banned) {
      await removeAllTokensByUid(userUid);
    }

    return { message: banned ? 'Пользователь заблокирован' : 'Пользователь разблокирован' };
  } catch (error) {
    logger.error(`admin.service setUserBan: ${error?.message ?? error}`);
    throw error;
  }
};

export const listTeams = async (search?: string) => {
  try {
    return await db
      .select({
        uid: team.uid,
        name: team.name,
        type: team.type,
        image: team.image,
        members: count(userTeamRole.uid),
      })
      .from(team)
      .leftJoin(userTeamRole, eq(userTeamRole.teamUid, team.uid))
      .where(search ? ilike(team.name, `%${search}%`) : undefined)
      .groupBy(team.uid);
  } catch (error) {
    logger.error(`admin.service listTeams: ${error?.message ?? error}`);
    throw error;
  }
};

export const setTeamBan = async (teamUid: string, banned: boolean) => {
  try {
    const updated = await db
      .update(team)
      .set({ type: banned ? TeamTypes.BANNED : TeamTypes.PERMANENT })
      .where(eq(team.uid, teamUid))
      .returning();

    if (updated.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Команда не найдена');
    }

    return { message: banned ? 'Команда заблокирована' : 'Команда разблокирована' };
  } catch (error) {
    logger.error(`admin.service setTeamBan: ${error?.message ?? error}`);
    throw error;
  }
};

export const deleteTeam = async (teamUid: string) => {
  try {
    await db.delete(team).where(eq(team.uid, teamUid));
    return { message: 'Команда удалена' };
  } catch (error) {
    logger.error(`admin.service deleteTeam: ${error?.message ?? error}`);
    throw error;
  }
};

export const deleteEvent = async (eventUid: string) => {
  try {
    await db.delete(event).where(eq(event.uid, eventUid));
    return { message: 'Мероприятие удалено' };
  } catch (error) {
    logger.error(`admin.service deleteEvent: ${error?.message ?? error}`);
    throw error;
  }
};

export const closeEvent = async (eventUid: string) => {
  try {
    const updated = await db
      .update(event)
      .set({ status: StatusEnum.CLOSED })
      .where(eq(event.uid, eventUid))
      .returning();

    if (updated.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Мероприятие не найдено');
    }

    return { message: 'Регистрация закрыта' };
  } catch (error) {
    logger.error(`admin.service closeEvent: ${error?.message ?? error}`);
    throw error;
  }
};
