import type { Answer } from "@pages/NaVzlyot/model/answers";

import { api } from "@shared/api";

import type { ISkill } from "./getSkillPool";

interface IGenerateRoadmap {
  testResult: Answer[];
  interestedIn: ISkill[];
  chosenCategory: number;
}

export type TPostGenerateRoadmapConfig = TRequestConfig<IGenerateRoadmap>;

export const postGenerateRoadmap = ({ params, config }: TPostGenerateRoadmapConfig) =>
  api.post("/user/generate-roadmap", params, config);
