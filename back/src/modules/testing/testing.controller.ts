import { GenerateTestDto } from './dto/generate-test.dto';
import type { Request, Response, NextFunction } from 'express';
import * as testService from './testing.service';

export async function getSkills(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await testService.getSkillsList();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createTest(
  req: Request<{}, {}, GenerateTestDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await testService.generateTest(req.user.uid, req.body);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
