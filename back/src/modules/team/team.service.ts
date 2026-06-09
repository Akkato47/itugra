import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import type {
  CreateInviteUserDto,
  CreateRoleDto,
  CreateTeamDto,
} from './dto/create-team.dto';
import { db } from '@/db/drizzle/connect';
import type { TeamInferSelect } from '@/db/drizzle/schema/team/schema';
import {
  customTeamRole,
  team,
  teamInvites,
  userTeamRole,
} from '@/db/drizzle/schema/team/schema';
import { and, eq, ne } from 'drizzle-orm';
import { users } from '@/db/drizzle/schema/user/schema';
import { Abilities } from '@/db/drizzle/schema/team/enum/ability.enum';
import {
  UpdateRoleDto,
  UpdateTeamDto,
  UpdateUserRoleDto,
} from './dto/update-team.dto';
import {
  DeleteRoleDto,
  DeleteTeamDto,
  DeleteUserTeamDto,
} from './dto/delete-team.dto';
import { logger } from '@/lib/loger';
import { notifyUser } from '@/lib/notify';
import { emitToUser } from '@/realtime/socket';
import { removeByInviteUid } from '@/modules/notification/notification.service';
import { NotificationType } from '@/db/drizzle/schema/notification/enums/notification-type.enum';

const emitInviteUpdate = (uid: string) => {
  emitToUser(uid, 'invite:update', { at: Date.now() });
};

const getMemberAbilities = async (userUid: string, teamUid: string) => {
  const rows = await db
    .select({ abilities: customTeamRole.abilities })
    .from(userTeamRole)
    .innerJoin(customTeamRole, eq(customTeamRole.uid, userTeamRole.ctrUid))
    .where(
      and(
        eq(userTeamRole.userUid, userUid),
        eq(userTeamRole.teamUid, teamUid)
      )
    );

  return rows[0]?.abilities ?? null;
};


export const createInvite = async (
  inviterUid: string,
  dto: CreateInviteUserDto
) => {
  try {
    const teamData = await db
      .select()
      .from(team)
      .where(eq(team.uid, dto.teamUid));
    const ctr = await db
      .select()
      .from(customTeamRole)
      .where(eq(customTeamRole.uid, dto.ctrUid));
    const addressee = await db
      .select({ uid: users.uid })
      .from(users)
      .where(eq(users.tag, dto.userTag));

    if (teamData.length === 0 || ctr.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Команда или роль не найдена');
    }
    if (addressee.length === 0) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        'Приглашаемый пользователь не найден'
      );
    }
    if (ctr[0].teamUid !== dto.teamUid) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        'Роль не принадлежит этой команде'
      );
    }

    const inviterAbilities = await getMemberAbilities(inviterUid, dto.teamUid);
    if (!inviterAbilities) {
      throw new CustomError(HttpStatus.FORBIDDEN, 'Вы не состоите в этой команде');
    }
    if (
      !inviterAbilities.includes(Abilities.ALL) &&
      !inviterAbilities.includes(Abilities.INVITE)
    ) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        'Недостаточно прав для приглашения в команду'
      );
    }

    const inviteeUid = addressee[0].uid;

    if (await getMemberAbilities(inviteeUid, dto.teamUid)) {
      throw new CustomError(HttpStatus.CONFLICT, 'Пользователь уже в команде');
    }

    const existing = await db
      .select()
      .from(teamInvites)
      .where(
        and(
          eq(teamInvites.teamUid, dto.teamUid),
          eq(teamInvites.inviteeUid, inviteeUid)
        )
      );

    let invite = existing[0];
    if (!invite) {
      const created = await db
        .insert(teamInvites)
        .values({
          teamUid: dto.teamUid,
          ctrUid: dto.ctrUid,
          inviterUid,
          inviteeUid,
        })
        .returning();
      invite = created[0];
    }

    await notifyUser({
      userUid: inviteeUid,
      type: NotificationType.TEAM_INVITE,
      title: 'Новое приглашение в команду',
      message: `Команда "${teamData[0].name}" приглашает вас на роль: ${ctr[0].name}`,
      payload: {
        inviteUid: invite.uid,
        teamUid: dto.teamUid,
        teamName: teamData[0].name,
        roleName: ctr[0].name,
        actorUid: inviterUid,
      },
    });
    emitInviteUpdate(inviteeUid);

    return invite;
  } catch (error) {
    logger.error(`createInvite failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const acceptInvite = async (userUid: string, inviteUid: string) => {
  try {
    const invites = await db
      .select()
      .from(teamInvites)
      .where(
        and(
          eq(teamInvites.uid, inviteUid),
          eq(teamInvites.inviteeUid, userUid)
        )
      );

    const invite = invites[0];
    if (!invite) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Приглашение не найдено');
    }

    await db.insert(userTeamRole).values({
      ctrUid: invite.ctrUid,
      teamUid: invite.teamUid,
      userUid,
    });

    await db.delete(teamInvites).where(eq(teamInvites.uid, inviteUid));
    await removeByInviteUid(inviteUid);
    emitInviteUpdate(userUid);

    return { success: true };
  } catch (error) {
    logger.error(`acceptInvite failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const declineInvite = async (userUid: string, inviteUid: string) => {
  try {
    const deleted = await db
      .delete(teamInvites)
      .where(
        and(
          eq(teamInvites.uid, inviteUid),
          eq(teamInvites.inviteeUid, userUid)
        )
      )
      .returning();

    if (deleted.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Приглашение не найдено');
    }

    await removeByInviteUid(inviteUid);
    emitInviteUpdate(userUid);

    return { success: true };
  } catch (error) {
    logger.error(`declineInvite failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const getIncomingInvites = async (userUid: string) => {
  try {
    return await db
      .select({
        inviteUid: teamInvites.uid,
        createdAt: teamInvites.createdAt,
        teamUid: team.uid,
        teamName: team.name,
        teamImage: team.image,
        roleName: customTeamRole.name,
        roleColor: customTeamRole.color,
        inviterTag: users.tag,
        inviterName: users.fullName,
      })
      .from(teamInvites)
      .where(eq(teamInvites.inviteeUid, userUid))
      .innerJoin(team, eq(team.uid, teamInvites.teamUid))
      .innerJoin(customTeamRole, eq(customTeamRole.uid, teamInvites.ctrUid))
      .innerJoin(users, eq(users.uid, teamInvites.inviterUid));
  } catch (error) {
    logger.error(`getIncomingInvites failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const getTeamList = async (userUid: string) => {
  try {
    const teams = await db
      .select({
        uid: team.uid,
        name: team.name,
        image: team.image,
        type: team.type,
      })
      .from(userTeamRole)
      .where(eq(userTeamRole.userUid, userUid))
      .innerJoin(team, eq(team.uid, userTeamRole.teamUid));
    return teams;
  } catch (error) {
    throw error;
  }
};

export const getTeamData = async (tag: string, teamUid: string) => {
  try {
    const teamData = await db
      .select({
        uid: team.uid,
        name: team.name,
        about: team.about,
        image: team.image,
        type: team.type,
      })
      .from(team)
      .where(eq(team.uid, teamUid));
    const members = await db
      .select({
        uid: users.uid,
        fullName: users.fullName,
        tag: users.tag,
        roleName: customTeamRole.name,
        color: customTeamRole.color,
        abilities: customTeamRole.abilities,
      })
      .from(userTeamRole)
      .where(eq(userTeamRole.teamUid, teamData[0].uid))
      .innerJoin(users, eq(users.uid, userTeamRole.userUid))
      .innerJoin(customTeamRole, eq(customTeamRole.uid, userTeamRole.ctrUid));

    const userList = members.map((member) => {
      const base = {
        uid: member.uid,
        fullName: member.fullName,
        tag: member.tag,
        role: member.roleName,
        color: member.color,
      };
      return member.tag === tag
        ? { ...base, myAbilities: [...member.abilities] }
        : { ...base, abilities: member.abilities };
    });

    const roles = await db
      .select({
        uid: customTeamRole.uid,
        name: customTeamRole.name,
        color: customTeamRole.color,
        abilities: customTeamRole.abilities,
      })
      .from(customTeamRole)
      .where(eq(customTeamRole.teamUid, teamUid));
    const response = {
      ...teamData[0],
      userList,
      roles,
    };
    return response;
  } catch (error) {
    throw error;
  }
};

const generateCTRDefault = async (team: TeamInferSelect) => {
  try {
    const owner = await db
      .insert(customTeamRole)
      .values({
        color: '#7C3AED',
        name: 'Создатель',
        teamUid: team.uid,
        abilities: [Abilities.ALL],
      })
      .returning();
    const participant = await db
      .insert(customTeamRole)
      .values({
        color: '#16A34A',
        name: 'Участник',
        teamUid: team.uid,
        abilities: [Abilities.NOTHING],
      })
      .returning();
    const response = { owner, participant };
    return response;
  } catch (error) {
    throw error;
  }
};

export const createTeam = async (
  userUid: string,
  createTeamDto: CreateTeamDto
) => {
  try {
    const newTeam = await db.insert(team).values(createTeamDto).returning();
    const { owner, ...rest } = await generateCTRDefault(newTeam[0]);
    const user = await db.select().from(users).where(eq(users.uid, userUid));
    await db.insert(userTeamRole).values({
      ctrUid: owner[0].uid,
      teamUid: newTeam[0].uid,
      userUid: user[0].uid,
    });
  } catch (error) {
    throw error;
  }
};

export const createRole = async (dto: CreateRoleDto) => {
  try {
    await db
      .insert(customTeamRole)
      .values({ ...dto })
      .execute();
  } catch (error) {
    throw error;
  }
};

export const updateTeamData = async (dto: UpdateTeamDto) => {
  try {
    const { uid, ...rest } = dto;
    await db.update(team).set(rest).where(eq(team.uid, uid));
  } catch (error) {
    throw error;
  }
};

export const updateRoleData = async (dto: UpdateRoleDto) => {
  try {
    const { uid, ...rest } = dto;
    await db
      .update(customTeamRole)
      .set(rest)
      .where(eq(customTeamRole.uid, uid));
  } catch (error) {
    throw error;
  }
};

export const updateUserRole = async (dto: UpdateUserRoleDto) => {
  try {
    const { teamUid, userUid, ...rest } = dto;
    await db
      .update(userTeamRole)
      .set(rest)
      .where(
        and(
          eq(userTeamRole.teamUid, teamUid),
          eq(userTeamRole.userUid, userUid)
        )
      );
  } catch (error) {
    throw error;
  }
};

export const deleteTeam = async (dto: DeleteTeamDto) => {
  try {
    await db.delete(team).where(eq(team.uid, dto.teamUid));
  } catch (error) {
    throw error;
  }
};

export const deleteUserTeam = async (dto: DeleteUserTeamDto) => {
  try {
    await db
      .delete(userTeamRole)
      .where(
        and(
          eq(userTeamRole.teamUid, dto.teamUid),
          eq(userTeamRole.userUid, dto.userUid)
        )
      );
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (dto: DeleteRoleDto) => {
  try {
    const usersWithRole = await db
      .select()
      .from(userTeamRole)
      .where(eq(userTeamRole.ctrUid, dto.ctrUid));
    if (usersWithRole.length > 0) {
      const firstRole = await db
        .select()
        .from(customTeamRole)
        .where(ne(customTeamRole.uid, dto.ctrUid))
        .limit(1)
        .orderBy(customTeamRole.uid);
      if (firstRole.length > 0) {
        await db
          .update(userTeamRole)
          .set({ ctrUid: firstRole[0].uid })
          .where(eq(userTeamRole.ctrUid, dto.ctrUid));
      }
    } else {
      const remainingRoles = await db
        .select()
        .from(customTeamRole)
        .where(eq(customTeamRole.teamUid, dto.teamUid));

      if (remainingRoles.length <= 1) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          'Нельзя удалить последнюю роль'
        );
      }
    }

    await db.delete(customTeamRole).where(eq(customTeamRole.uid, dto.ctrUid));
  } catch (error) {
    throw error;
  }
};
