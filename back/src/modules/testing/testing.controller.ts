import { GenerateTestDto } from './dto/generate-test.dto';
import type { Request, Response, NextFunction } from 'express';

export async function getTest(
  req: Request<{}, {}, GenerateTestDto>,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    next(error);
  }
}
