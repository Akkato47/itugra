import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { createTeamFormSchema } from "../lib/createTeamFormSchema";

export const useCreateTeamForm = () =>
  useForm<z.infer<typeof createTeamFormSchema>>({
    resolver: zodResolver(createTeamFormSchema),
    defaultValues: {
      name: ""
    }
  });
