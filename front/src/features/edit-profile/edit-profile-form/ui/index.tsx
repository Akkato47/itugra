/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { type IUserLocation, type IUserProfile, useUser } from "@entities/user";

import { GraphIcon } from "@shared/icons";
import { Button, Input, Switch, Textarea } from "@shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@shared/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";

import type { IUserDataRequest } from "../api/patchUpdateUser";
import type { IEditProfileForm } from "../model/useEditProfileForm";
import { useUpdateProfileInfo } from "../model/useUpdateProfileInfo";
import { LocationForm } from "./LocationForm";

export const EditProfileForm = ({
  fullName,
  tag,
  profileInfo,
  image,
  backgroundImage,
  editProfileForm
}: IUserProfile & { editProfileForm: UseFormReturn<IEditProfileForm, any, undefined> }) => {
  const profileData = {
    fullName: fullName,
    image: image,
    backgroundImage: backgroundImage,
    tag: tag,
    status: profileInfo.status,
    isSearchingJob: profileInfo.isSearchingJob,
    about: profileInfo.about,
    userLocation: profileInfo.userLocation
  };
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUserContextData } = useUser();

  const userLocation = editProfileForm.getValues("userLocation");

  const { updateProfileInfo } = useUpdateProfileInfo();

  const setUserLcoation = (locationValue: IUserLocation) =>
    editProfileForm.setValue("userLocation", locationValue, { shouldDirty: true });

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const allValues = editProfileForm.getValues();

    const dirtyFields = editProfileForm.formState.dirtyFields;

    const updatedFields: Partial<IUserDataRequest> = Object.keys(dirtyFields).reduce((acc, key) => {
      const typedKey = key as keyof typeof allValues;
      if (dirtyFields[typedKey]) {
        if (typedKey === "fullName") acc.fullName = allValues.fullName;
        if (typedKey === "birthDate")
          acc.birthDate = allValues.birthDate.split(".").reverse().join("-");
        if (typedKey === "tag") acc.tag = allValues.tag;

        if (typedKey === "status" || typedKey === "isSearchingJob" || typedKey === "about") {
          acc.profileInfo = {
            ...acc.profileInfo,
            [typedKey]: allValues[typedKey]
          };
        }
        if (typedKey === "userLocation" && allValues.userLocation) {
          acc.profileLoc = {
            city: allValues.userLocation.city,
            region: allValues.userLocation.region,
            country: allValues.userLocation.country
          };
        }
        if (typedKey === "image" && allValues.image) {
          acc.image = {
            fileUrl: allValues.image.fileUrl,
            name: allValues.image.name,
            thumbnailUrl: allValues.image.thumbnailUrl,
            uid: allValues.image.uid
          };
        }
        if (typedKey === "backGroundImage" && allValues.backGroundImage) {
          acc.backgroundImage = {
            fileUrl: allValues.backGroundImage.fileUrl,
            name: allValues.backGroundImage.name,
            thumbnailUrl: allValues.backGroundImage.thumbnailUrl,
            uid: allValues.backGroundImage.uid
          };
        }
      }
      return acc;
    }, {} as Partial<IUserDataRequest>);

    updateProfileInfo(updatedFields).then(() => {
      editProfileForm.reset(editProfileForm.getValues());
      setUserContextData({ ...user!, tag: allValues.tag });
    });
  };

  return (
    <Form {...editProfileForm}>
      <form className='w-full px-11 space-y-6 relative mt-10 border-t border-slate-300 mb-8 pt-5'>
        <FormField
          control={editProfileForm.control}
          name='fullName'
          render={({ field }) => (
            <FormItem className='grid grid-cols-[200px_1fr] items-center'>
              <FormLabel className='leading-[150%] font-medium'>ФИО</FormLabel>
              <FormControl>
                <Input placeholder='Введите ФИО' className='h-10' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editProfileForm.control}
          name='tag'
          render={({ field }) => (
            <FormItem className='grid grid-cols-[200px_1fr] items-center'>
              <FormLabel className='leading-[150%] font-medium'>Никнейм</FormLabel>
              <FormControl>
                <Input placeholder='Введите ваш никнейм' className='h-10' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editProfileForm.control}
          name='status'
          render={({ field }) => (
            <FormItem className='grid grid-cols-[200px_1fr] items-center'>
              <FormLabel className='flex items-center gap-3'>
                <GraphIcon />
                <span className='font-medium'>Статус</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Введите статус' className='h-10' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editProfileForm.control}
          name='birthDate'
          render={({ field }) => (
            <FormItem className='grid grid-cols-[200px_1fr] items-center'>
              <FormLabel className='font-medium'>Дата рождения</FormLabel>
              <FormControl>
                <Input placeholder='2004-09-16' className='h-10' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editProfileForm.control}
          name='isSearchingJob'
          render={({ field }) => (
            <FormItem className='grid grid-cols-[200px_1fr] items-center'>
              <FormLabel className='font-medium'>В поиске работы</FormLabel>
              <FormControl>
                <Switch
                  checked={editProfileForm.getValues("isSearchingJob")}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-[200px_1fr_96px] items-center'>
          <p className='font-medium text-sm'>Место проживания</p>
          {userLocation && (
            <p className='leading-[150%] font-medium'>{`г. ${userLocation.city}, ${userLocation.region}`}</p>
          )}
          {!userLocation && <p className='leading-[150%]'>Нет данных</p>}
          <Dialog onOpenChange={() => setIsOpen(true)} open={isOpen}>
            <DialogTrigger className='w-full text-left space-y-1 -mt-[5px]' asChild>
              <Button variant='ghost'>{profileData.userLocation ? "Изменить" : "Добавить"}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Изменение адреса</DialogTitle>
              </DialogHeader>
              <LocationForm
                setIsOpen={setIsOpen}
                location={profileData.userLocation}
                setUserLcoation={setUserLcoation}
              />
            </DialogContent>
          </Dialog>
        </div>
        <FormField
          control={editProfileForm.control}
          name='about'
          render={({ field }) => (
            <FormItem className='grid grid-cols-[200px_1fr]'>
              <FormLabel className='font-medium leading-[150%]'>Краткая информация:</FormLabel>
              <FormControl>
                <Textarea placeholder='Расскажите о себе' className='h-20' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-center pt-4'>
          <Button
            onClick={(e) => onSubmitHandler(e)}
            size='lg'
            disabled={!editProfileForm.formState.isDirty}
          >
            Сохранить изменения
          </Button>
        </div>
      </form>
    </Form>
  );
};
