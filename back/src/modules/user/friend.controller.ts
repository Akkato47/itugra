import type { Request, Response, NextFunction } from 'express';

import * as friendService from './friend.service';

export async function sendFriendRequest(
  req: Request<{ tag: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await friendService.sendFriendRequest(
      req.user.uid,
      req.params.tag
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function acceptFriendRequest(
  req: Request<{ requestUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await friendService.acceptFriendRequest(
      req.user.uid,
      req.params.requestUid
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function declineFriendRequest(
  req: Request<{ requestUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await friendService.declineFriendRequest(
      req.user.uid,
      req.params.requestUid
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function removeFriend(
  req: Request<{ tag: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await friendService.removeFriend(
      req.user.uid,
      req.params.tag
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getFriends(
  req: Request<{ tag: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await friendService.getFriends(req.params.tag);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getFriendRequests(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await friendService.getFriendRequests(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getFriendshipStatus(
  req: Request<{ tag: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await friendService.getFriendshipStatus(
      req.user.uid,
      req.params.tag
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
