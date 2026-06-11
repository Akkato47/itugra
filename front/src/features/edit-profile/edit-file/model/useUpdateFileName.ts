import type { z } from "zod";

import { useUpdateFile } from "../api/useUpdateFile";
import type { editFileFormSheme } from "../lib/editFileFormSheme";

export const useUpdateFileName = () => {
  const { mutate } = useUpdateFile();

  const updateFileName = async (data: z.infer<typeof editFileFormSheme>, uid: string) => {
    mutate({
      params: { name: data.name, fileUid: uid }
    });
  };

  return { updateFileName };
};
