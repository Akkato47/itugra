import type { Request, Response, NextFunction } from 'express';
import * as adminService from './admin.service';
import { SetBanDto, SetRoleDto } from './dto/admin.dto';

export async function getStats(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await adminService.getStats();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUsers(
  req: Request<{}, {}, {}, { search?: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.listUsers(req.query.search);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function setUserRole(
  req: Request<{ userUid: string }, {}, SetRoleDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.setUserRole(
      req.params.userUid,
      req.body.role
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function setUserBan(
  req: Request<{ userUid: string }, {}, SetBanDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.setUserBan(
      req.params.userUid,
      req.body.banned
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTeams(
  req: Request<{}, {}, {}, { search?: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.listTeams(req.query.search);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function setTeamBan(
  req: Request<{ teamUid: string }, {}, SetBanDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.setTeamBan(
      req.params.teamUid,
      req.body.banned
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteTeam(
  req: Request<{ teamUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.deleteTeam(req.params.teamUid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(
  req: Request<{ eventUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.deleteEvent(req.params.eventUid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function closeEvent(
  req: Request<{ eventUid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await adminService.closeEvent(req.params.eventUid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
