import { and, eq, inArray, or } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import { userFriends, users } from '@/db/drizzle/schema/user/schema';
import { FriendStatus } from '@/db/drizzle/schema/user/enums/friend-status.enum';
import { NotificationType } from '@/db/drizzle/schema/notification/enums/notification-type.enum';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import { logger } from '@/lib/loger';
import { notifyUser } from '@/lib/notify';
import { emitToUser } from '@/realtime/socket';
import { removeByRequestUid } from '@/modules/notification/notification.service';

export type FriendshipStatus =
  | 'SELF'
  | 'NONE'
  | 'FRIENDS'
  | 'INCOMING'
  | 'OUTGOING';

const friendShortSelect = {
  uid: users.uid,
  fullName: users.fullName,
  tag: users.tag,
  image: users.image,
  role: users.role,
};

const getUserByTagOrThrow = async (tag: string) => {
  const found = await db
    .select({ uid: users.uid })
    .from(users)
    .where(eq(users.tag, tag));

  if (found.length === 0) {
    throw new CustomError(HttpStatus.NOT_FOUND, 'Пользователь не найден');
  }

  return found[0];
};

const getActor = async (uid: string) => {
  const rows = await db
    .select({
      uid: users.uid,
      fullName: users.fullName,
      tag: users.tag,
      image: users.image,
    })
    .from(users)
    .where(eq(users.uid, uid));

  return rows[0];
};

const emitFriendshipUpdate = (uid: string) => {
  emitToUser(uid, 'friendship:update', { at: Date.now() });
};

const findRelation = async (firstUid: string, secondUid: string) => {
  const relation = await db
    .select()
    .from(userFriends)
    .where(
      or(
        and(
          eq(userFriends.requesterUid, firstUid),
          eq(userFriends.addresseeUid, secondUid)
        ),
        and(
          eq(userFriends.requesterUid, secondUid),
          eq(userFriends.addresseeUid, firstUid)
        )
      )
    );

  return relation[0];
};

export const sendFriendRequest = async (
  requesterUid: string,
  addresseeTag: string
) => {
  try {
    const addressee = await getUserByTagOrThrow(addresseeTag);

    if (addressee.uid === requesterUid) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        'Нельзя добавить в друзья самого себя'
      );
    }

    const relation = await findRelation(requesterUid, addressee.uid);

    if (relation) {
      if (relation.status === FriendStatus.ACCEPTED) {
        throw new CustomError(HttpStatus.CONFLICT, 'Вы уже друзья');
      }

      if (relation.addresseeUid === requesterUid) {
        const accepted = await db
          .update(userFriends)
          .set({ status: FriendStatus.ACCEPTED })
          .where(eq(userFriends.uid, relation.uid))
          .returning();

        const actor = await getActor(requesterUid);
        await notifyUser({
          userUid: relation.requesterUid,
          type: NotificationType.FRIEND_ACCEPT,
          title: 'Заявка принята',
          message: `${actor.fullName} принял вашу заявку в друзья`,
          payload: {
            actorUid: actor.uid,
            actorTag: actor.tag,
            actorName: actor.fullName,
            actorImage: actor.image?.fileUrl ?? null,
          },
        });
        emitFriendshipUpdate(relation.requesterUid);
        await removeByRequestUid(relation.uid);

        return accepted[0];
      }

      throw new CustomError(HttpStatus.CONFLICT, 'Заявка уже отправлена');
    }

    const created = await db
      .insert(userFriends)
      .values({
        requesterUid,
        addresseeUid: addressee.uid,
        status: FriendStatus.PENDING,
      })
      .returning();

    const actor = await getActor(requesterUid);
    await notifyUser({
      userUid: addressee.uid,
      type: NotificationType.FRIEND_REQUEST,
      title: 'Новая заявка в друзья',
      message: `${actor.fullName} хочет добавить вас в друзья`,
      payload: {
        actorUid: actor.uid,
        actorTag: actor.tag,
        actorName: actor.fullName,
        actorImage: actor.image?.fileUrl ?? null,
        requestUid: created[0].uid,
      },
    });
    emitFriendshipUpdate(addressee.uid);

    return created[0];
  } catch (error) {
    logger.error(`sendFriendRequest failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const acceptFriendRequest = async (
  userUid: string,
  requestUid: string
) => {
  try {
    const accepted = await db
      .update(userFriends)
      .set({ status: FriendStatus.ACCEPTED })
      .where(
        and(
          eq(userFriends.uid, requestUid),
          eq(userFriends.addresseeUid, userUid),
          eq(userFriends.status, FriendStatus.PENDING)
        )
      )
      .returning();

    if (accepted.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Заявка не найдена');
    }

    const actor = await getActor(userUid);
    await notifyUser({
      userUid: accepted[0].requesterUid,
      type: NotificationType.FRIEND_ACCEPT,
      title: 'Заявка принята',
      message: `${actor.fullName} принял вашу заявку в друзья`,
      payload: {
        actorUid: actor.uid,
        actorTag: actor.tag,
        actorName: actor.fullName,
        actorImage: actor.image?.fileUrl ?? null,
      },
    });
    emitFriendshipUpdate(accepted[0].requesterUid);
    await removeByRequestUid(accepted[0].uid);

    return accepted[0];
  } catch (error) {
    logger.error(`acceptFriendRequest failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const declineFriendRequest = async (
  userUid: string,
  requestUid: string
) => {
  try {
    const deleted = await db
      .delete(userFriends)
      .where(
        and(
          eq(userFriends.uid, requestUid),
          eq(userFriends.status, FriendStatus.PENDING),
          or(
            eq(userFriends.addresseeUid, userUid),
            eq(userFriends.requesterUid, userUid)
          )
        )
      )
      .returning();

    if (deleted.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Заявка не найдена');
    }

    const counterpartyUid =
      deleted[0].requesterUid === userUid
        ? deleted[0].addresseeUid
        : deleted[0].requesterUid;
    emitFriendshipUpdate(counterpartyUid);
    await removeByRequestUid(deleted[0].uid);

    return { success: true };
  } catch (error) {
    logger.error(`declineFriendRequest failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const removeFriend = async (userUid: string, friendTag: string) => {
  try {
    const friend = await getUserByTagOrThrow(friendTag);

    const deleted = await db
      .delete(userFriends)
      .where(
        and(
          eq(userFriends.status, FriendStatus.ACCEPTED),
          or(
            and(
              eq(userFriends.requesterUid, userUid),
              eq(userFriends.addresseeUid, friend.uid)
            ),
            and(
              eq(userFriends.requesterUid, friend.uid),
              eq(userFriends.addresseeUid, userUid)
            )
          )
        )
      )
      .returning();

    if (deleted.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Пользователь не в друзьях');
    }

    emitFriendshipUpdate(friend.uid);

    return { success: true };
  } catch (error) {
    logger.error(`removeFriend failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const getFriends = async (tag: string) => {
  try {
    const owner = await getUserByTagOrThrow(tag);

    const relations = await db
      .select({
        requesterUid: userFriends.requesterUid,
        addresseeUid: userFriends.addresseeUid,
      })
      .from(userFriends)
      .where(
        and(
          eq(userFriends.status, FriendStatus.ACCEPTED),
          or(
            eq(userFriends.requesterUid, owner.uid),
            eq(userFriends.addresseeUid, owner.uid)
          )
        )
      );

    const friendUids = relations.map((relation) =>
      relation.requesterUid === owner.uid
        ? relation.addresseeUid
        : relation.requesterUid
    );

    if (friendUids.length === 0) {
      return [];
    }

    return db
      .select(friendShortSelect)
      .from(users)
      .where(inArray(users.uid, friendUids));
  } catch (error) {
    logger.error(`getFriends failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const getFriendRequests = async (userUid: string) => {
  try {
    const incoming = await db
      .select({
        requestUid: userFriends.uid,
        createdAt: userFriends.createdAt,
        ...friendShortSelect,
      })
      .from(userFriends)
      .innerJoin(users, eq(users.uid, userFriends.requesterUid))
      .where(
        and(
          eq(userFriends.addresseeUid, userUid),
          eq(userFriends.status, FriendStatus.PENDING)
        )
      );

    const outgoing = await db
      .select({
        requestUid: userFriends.uid,
        createdAt: userFriends.createdAt,
        ...friendShortSelect,
      })
      .from(userFriends)
      .innerJoin(users, eq(users.uid, userFriends.addresseeUid))
      .where(
        and(
          eq(userFriends.requesterUid, userUid),
          eq(userFriends.status, FriendStatus.PENDING)
        )
      );

    return { incoming, outgoing };
  } catch (error) {
    logger.error(`getFriendRequests failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const getFriendshipStatus = async (
  userUid: string,
  tag: string
): Promise<{ status: FriendshipStatus; requestUid: string | null }> => {
  try {
    const other = await getUserByTagOrThrow(tag);

    if (other.uid === userUid) {
      return { status: 'SELF', requestUid: null };
    }

    const relation = await findRelation(userUid, other.uid);

    if (!relation) {
      return { status: 'NONE', requestUid: null };
    }

    if (relation.status === FriendStatus.ACCEPTED) {
      return { status: 'FRIENDS', requestUid: relation.uid };
    }

    return {
      status: relation.requesterUid === userUid ? 'OUTGOING' : 'INCOMING',
      requestUid: relation.uid,
    };
  } catch (error) {
    logger.error(`getFriendshipStatus failed: ${error?.message ?? error}`);
    throw error;
  }
};
