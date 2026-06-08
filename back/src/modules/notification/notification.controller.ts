import type { Request, Response, NextFunction } from 'express';

import * as notificationService from './notification.service';

export async function getNotifications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await notificationService.getNotifications(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUnreadCount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await notificationService.getUnreadCount(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await notificationService.markAsRead(
      req.user.uid,
      req.params.uid
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function markAllRead(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await notificationService.markAllRead(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
