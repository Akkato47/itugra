import { CustomError } from '@/utils/custom_error';
import { Request, Response, NextFunction } from 'express';
import { RoleEnum } from '@/db/drizzle/schema/user/enums/role.enum';
import { HttpStatus } from '@/utils/enums/http-status';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user.role !== RoleEnum.ADMIN) {
      return next(new CustomError(HttpStatus.FORBIDDEN));
    }
    return next();
  } catch (error) {
    next(new CustomError(401, 'Unauthorized'));
  }
}
