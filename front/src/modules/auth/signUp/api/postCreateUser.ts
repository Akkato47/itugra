import { api } from "@shared/api/instance";

interface PostCreateUserParams {
  firstName: string;
  secondName: string;
  phone: string;
  role: string;
  mail: string;
  password: string;
}

export type PostCreateUserConfig = RequestConfig<PostCreateUserParams>;

export const postCreateUser = async ({ params, config }: PostCreateUserConfig) =>
  api.post<any>("auth/register", params, config);
