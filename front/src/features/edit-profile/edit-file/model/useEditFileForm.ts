import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { editFileFormSheme } from "../lib/editFileFormSheme";

export const useEditFileForm = (name: string) =>
  useForm<z.infer<typeof editFileFormSheme>>({
    resolver: zodResolver(editFileFormSheme),
    defaultValues: {
      name: name || ""
    }
  });
