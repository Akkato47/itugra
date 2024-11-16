import { CreateRequestDto, MakeDecisions } from './dto/request.dto';
import type { Request, Response, NextFunction } from 'express';
import * as eventService from './event.service';

export async function getRequest(
  req: Request<{ requestUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await eventService.getRequest(req.params.requestUid);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export async function getEvent(
  req: Request<{ eventUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await eventService.getEvent(req.params.eventUid);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getRequests(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await eventService.getRequests();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await eventService.getEvents();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createRequest(
  req: Request<{}, {}, CreateRequestDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await eventService.createRequest(req.user.uid, req.body);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function makeDecision(
  req: Request<{}, {}, MakeDecisions>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await eventService.makeDecisions(req.user.uid, req.body);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
