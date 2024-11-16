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
import redisClient from '@/db/redis';
import { getUserByTag } from '../user/user.service';
import token from '../auth/lib/token';
import {
  IDecodedInviteToken,
  IDecodedToken,
} from '../auth/types/decodedToken.interface';

export const createInvite = async (dto: CreateInviteUserDto) => {
  try {
    const inviteToken = token.generate({
      payload: dto,
      tokenType: 'access',
    });
    const expiration = 24 * 60 * 60;
    await redisClient.SET(dto.userTag, inviteToken, { EX: expiration });
    return inviteToken;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const acceptInvite = async (inviteCode: string) => {
  try {
    const payload: IDecodedInviteToken = token.verify({
      token: inviteCode,
      tokenType: 'access',
    });
    const user = await getUserByTag(payload.userTag);
    if (!user) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        'Приглашенный пользователь не найден или удалён.'
      );
    }
    await db.insert(userTeamRole).values({
      ctrUid: payload.ctrUid,
      teamUid: payload.teamUid,
      userUid: user.uid,
    });
    await redisClient.DEL(payload.userTag);
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getTeamList = async (userUid: string) => {
  try {
    const utrs = await db
      .select()
      .from(userTeamRole)
      .where(eq(userTeamRole.userUid, userUid));
    const teams: Partial<TeamInferSelect>[] = [];
    for (const utr of utrs) {
      const teamItem = await db
        .select({
          uid: team.uid,
          name: team.name,
          image: team.image,
          type: team.type,
        })
        .from(team)
        .where(eq(team.uid, utr.teamUid));
      teams.push(teamItem[0]);
    }
    return teams;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    const userList = [];
    const utrs = await db
      .select()
      .from(userTeamRole)
      .where(eq(userTeamRole.teamUid, teamData[0].uid));
    for (const utr of utrs) {
      const user = await db
        .select({
          uid: users.uid,
          fullName: users.fullName,
          tag: users.tag,
        })
        .from(users)
        .where(eq(users.uid, utr.userUid));
      if (user[0].tag === tag) {
        const ctr = await db
          .select()
          .from(customTeamRole)
          .where(eq(customTeamRole.uid, utr.ctrUid));
        const userItem = {
          ...user[0],
          role: ctr[0].name,
          color: ctr[0].color,
          myAbilities: [...ctr[0].abilities],
        };
        userList.push(userItem);
      } else {
        const ctr = await db
          .select()
          .from(customTeamRole)
          .where(eq(customTeamRole.uid, utr.ctrUid));
        const userItem = {
          ...user[0],
          role: ctr[0].name,
          color: ctr[0].color,
          abilities: ctr[0].abilities,
        };
        userList.push(userItem);
      }
    }

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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const updateTeamData = async (dto: UpdateTeamDto) => {
  try {
    const { uid, ...rest } = dto;
    await db.update(team).set(rest).where(eq(team.uid, uid));
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const deleteTeam = async (dto: DeleteTeamDto) => {
  try {
    await db.delete(team).where(eq(team.uid, dto.teamUid));
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};
