import { api } from "../instanse";
import type { IUploadResponse } from "./types";

export type PostUploadConfig = TRequestConfig & { formData: FormData };

export const postUpload = ({ formData, config }: PostUploadConfig) =>
  api.post<IUploadResponse>(`/uploads/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    ...config
  });
