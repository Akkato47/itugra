import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { createEventFormSchema } from "../lib/createEventFormSchema";

export const useCreateEventForm = () =>
  useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      end: "",
      registrationEnd: "",
      categoryId: []
    }
  });
