import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { IUserLocation } from "@entities/user";

import { locationFormSchema } from "../lib/location-form-schema";

export const useLocationForm = (location: IUserLocation | null) =>
  useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      country: location?.country || "",
      region: location?.region || "",
      city: location?.city || ""
    }
  });
