import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { IUserLocation } from "@entities/user";

import { editProfileFormSchema } from "../lib/editProfileFormSchema";

interface IEditProfileFormDefaultValues {
  fullName: string | undefined;
  tag: string | undefined;
  status: string | undefined;
  isSearchingJob: boolean | undefined;
  image: IImage | null | undefined;
  backgroundImage: IImage | null | undefined;
  about: string | undefined;
  userLocation: IUserLocation | null | undefined;
  birthDate: string | undefined;
}

export interface IEditProfileForm {
  image: {
    name: string;
    fileUrl: string;
    uid: string;
    thumbnailUrl: string;
  } | null;
  fullName: string;
  about: string;
  tag: string;
  birthDate: string;
  status: string;
  isSearchingJob: boolean;
  userLocation: {
    country: string;
    region: string;
    city: string;
  } | null;
  backGroundImage: {
    name: string;
    fileUrl: string;
    uid: string;
    thumbnailUrl: string;
  } | null;
}

export const useEditProfileForm = (profileData: IEditProfileFormDefaultValues) =>
  useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      fullName: profileData.fullName || "",
      isSearchingJob: profileData.isSearchingJob || false,
      status: profileData.status || "",
      tag: profileData.tag || "",
      about: profileData.about || "",
      userLocation: profileData.userLocation || null,
      image: profileData.image || null,
      backGroundImage: profileData.backgroundImage || null,
      birthDate: profileData.birthDate || ""
    }
  });
