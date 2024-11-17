import type { Request, Response, NextFunction } from "express";
import type {
    CreateInviteUserDto,
    CreateRoleDto,
    CreateTeamDto,
} from "./dto/create-team.dto";
import * as teamService from "./team.service";
import {
    UpdateRoleDto,
    UpdateTeamDto,
    UpdateUserRoleDto,
} from "./dto/update-team.dto";
import {
    DeleteRoleDto,
    DeleteTeamDto,
    DeleteUserTeamDto,
} from "./dto/delete-team.dto";

export async function getTeamList(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.getTeamList(req.user.uid);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function createInvite(
    req: Request<{}, {}, CreateInviteUserDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.createInvite(req.body);
        return res.status(200).json({ inviteToken: result });
    } catch (error) {
        next(error);
    }
}

export async function acceptInvite(
    req: Request<{ inviteCode: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.acceptInvite(req.params.inviteCode);
        return res.status(200).json(result).status(200);
    } catch (error) {
        next(error);
    }
}

export async function getTeamData(
    req: Request<{ teamUid: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.getTeamData(
            req.user.tag,
            req.params.teamUid,
        );
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function createTeam(
    req: Request<{}, {}, CreateTeamDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.createTeam(req.user.uid, req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function createRole(
    req: Request<{}, {}, CreateRoleDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.createRole(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateTeamData(
    req: Request<{}, {}, UpdateTeamDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.updateTeamData(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateRoleData(
    req: Request<{}, {}, UpdateRoleDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.updateRoleData(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateUserRole(
    req: Request<{}, {}, UpdateUserRoleDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.updateUserRole(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteTeam(
    req: Request<{}, {}, DeleteTeamDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.deleteTeam(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteUserTeam(
    req: Request<{}, {}, DeleteUserTeamDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.deleteUserTeam(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteRole(
    req: Request<{}, {}, DeleteRoleDto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await teamService.deleteRole(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
