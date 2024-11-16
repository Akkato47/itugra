import type { Request, Response, NextFunction } from 'express';

import * as userService from './user.service';
import type {
  UpdateUserDto,
  UpdateUserEducationDto,
  UpdateUserExperienceDto,
} from './dto/update-user-info.dto';
import type {
  CreateExperienceDto,
  CreateUserSkillsDto,
} from './dto/create-user.dto';
import type { AddFileDto } from './dto/add-file.dto';
import { EditFileDto } from './dto/edit-file.dto';

// export async function getCompany(
//     req: Request<{ query: string }>,
//     res: Response,
//     next: NextFunction,
// ) {
//     try {
//         const result = await userService.findCompany(req.params.query);
//         return res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// }

export async function getUserProfile(
  req: Request<{ tag: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.getUserProfile(req.params.tag);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserExperience(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.getUserExperience(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserProfileInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.getUserProfileInfo(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserSecurity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.getUserSecurity(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserSkills(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.getUserSkills(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserEducation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.getUserEducation(req.user.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createUserExperience(
  req: Request<{}, {}, CreateExperienceDto>,
  res: Response,
  next: NextFunction
) {
  try {
    await userService.createExperience(req.user.uid, req.body);
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
}

export async function createUserSkills(
  req: Request<{}, {}, CreateUserSkillsDto>,
  res: Response,
  next: NextFunction
) {
  try {
    await userService.createSkills(req.user.uid, req.body);
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request<{}, {}, UpdateUserDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.updateUser(req.user.uid, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateUserExp(
  req: Request<{}, {}, UpdateUserExperienceDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.updateUserExp(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateUserEducation(
  req: Request<{}, {}, UpdateUserEducationDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.updateUserEducation(
      req.user.uid,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserExperience(
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.deleteExperience(
      req.user.uid,
      req.params.uid
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserSkill(
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.deleteSkill(req.user.uid, req.params.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function addFile(
  req: Request<{}, {}, AddFileDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.addFile(req.user.uid, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export async function editFile(
  req: Request<{}, {}, EditFileDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.editFile(req.user.uid, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteFile(
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.deleteFile(req.user.uid, req.params.uid);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
