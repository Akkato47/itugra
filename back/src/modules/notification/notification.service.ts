import { and, count, desc, eq, sql } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import { notifications } from '@/db/drizzle/schema/notification/schema';
import type { NotificationInferInsert } from '@/db/drizzle/schema/notification/schema';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import { logger } from '@/lib/loger';
import { emitToUser } from '@/lib/socket';

const removeByPayloadKey = async (key: string, value: string) => {
  try {
    const deleted = await db
      .delete(notifications)
      .where(sql`${notifications.payload} ->> ${key} = ${value}`)
      .returning({ uid: notifications.uid, userUid: notifications.userUid });

    deleted.forEach((notification) => {
      emitToUser(notification.userUid, 'notification:remove', {
        uid: notification.uid,
      });
    });

    return deleted;
  } catch (error) {
    logger.error(`removeByPayloadKey(${key}) failed: ${error?.message ?? error}`);
    return [];
  }
};

export const removeByRequestUid = (requestUid: string) =>
  removeByPayloadKey('requestUid', requestUid);

export const removeByInviteUid = (inviteUid: string) =>
  removeByPayloadKey('inviteUid', inviteUid);

export const createNotification = async (data: NotificationInferInsert) => {
  try {
    const created = await db.insert(notifications).values(data).returning();
    return created[0];
  } catch (error) {
    logger.error(`createNotification failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const getNotifications = async (userUid: string) => {
  try {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userUid, userUid))
      .orderBy(desc(notifications.createdAt))
      .limit(10);
  } catch (error) {
    logger.error(`getNotifications failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const getUnreadCount = async (userUid: string) => {
  try {
    const result = await db
      .select({ value: count() })
      .from(notifications)
      .where(
        and(
          eq(notifications.userUid, userUid),
          eq(notifications.isRead, false)
        )
      );

    return { count: Number(result[0]?.value ?? 0) };
  } catch (error) {
    logger.error(`getUnreadCount failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const markAsRead = async (userUid: string, uid: string) => {
  try {
    const updated = await db
      .update(notifications)
      .set({ isRead: true })
      .where(
        and(eq(notifications.uid, uid), eq(notifications.userUid, userUid))
      )
      .returning();

    if (updated.length === 0) {
      throw new CustomError(HttpStatus.NOT_FOUND, 'Уведомление не найдено');
    }

    return updated[0];
  } catch (error) {
    logger.error(`markAsRead failed: ${error?.message ?? error}`);
    throw error;
  }
};

export const markAllRead = async (userUid: string) => {
  try {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(
        and(
          eq(notifications.userUid, userUid),
          eq(notifications.isRead, false)
        )
      );

    return { success: true };
  } catch (error) {
    logger.error(`markAllRead failed: ${error?.message ?? error}`);
    throw error;
  }
};
