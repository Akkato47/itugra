import { api } from "@shared/api/instance";

interface PostLoginParams {
  mail?: string;
  phone?: string;
  password: string;
}

export type PostLoginConfig = RequestConfig<PostLoginParams>;

export const postLogin = async ({ params, config }: PostLoginConfig) =>
  api.post<any>("auth/login", params, config);
