/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pencil2Icon } from "@radix-ui/react-icons";
import { type ChangeEvent, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { postUpload } from "@shared/api";
import { toast } from "@shared/model/use-toast";
import { Avatar, CustomImage, Heading, Input, Label } from "@shared/ui";

import type { IEditProfileForm } from "../model/useEditProfileForm";

interface IImagesFormProps {
  backgroundImage: IImage | null;
  image: IImage | null;
  fullName: string;
  editProfileForm: UseFormReturn<IEditProfileForm, any, undefined>;
}

export const ImagesForm = ({ backgroundImage, fullName, editProfileForm }: IImagesFormProps) => {
  const formDataImage = new FormData();
  const [avatarFieldUrl, setAvatarFieldUrl] = useState(editProfileForm.getValues("image.fileUrl"));
  const [backGroundImageFieldUrl, setBackGroundImageFieldUrl] = useState(
    editProfileForm.getValues("backGroundImage.fileUrl")
  );

  const changeImage = async (
    e: ChangeEvent<HTMLInputElement>,
    type: "image" | "backGroundImage"
  ) => {
    const fileData = e.target.files && e.target.files[0];
    const extension = fileData?.name.split(".").at(-1);
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    if (extension && !imageExtensions.includes(extension)) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Невалидное расширение",
        description: ".jpg .jpeg .png .gif .bmp .svg .webp"
      });
      return;
    }
    formDataImage.append("file", fileData!);
    await postUpload({ formData: formDataImage })
      .then((res) => {
        editProfileForm.setValue(
          type,
          {
            name: res.data.name,
            fileUrl: res.data.url,
            uid: res.data.uid,
            thumbnailUrl: res.data.thumbnail.url
          },
          { shouldDirty: true }
        );
        if (type === "image") setAvatarFieldUrl(res.data.url);
        else setBackGroundImageFieldUrl(res.data.url);
      })
      .catch((err: any) =>
        toast({
          className: "bg-red-800 text-white hover:bg-red-700",
          title: "Не удалось обновить данные",
          description: `В ходе отправки запроса произошла ошибка: ${err.response.data.message}`
        })
      )
      .finally(() => {
        formDataImage.delete("file");
      });
  };

  return (
    <>
      {backgroundImage ? (
        <div className='relative w-full'>
          <CustomImage src={backgroundImage.fileUrl} className='w-full h-[234px] rounded-t-lg' />
          <div className=''>
            <Input
              accept='image/*'
              onChange={(e) => changeImage(e, "backGroundImage")}
              id='fileInput'
              className='hidden'
              type='file'
            />
            <Label
              className='bg-slate-900 flex items-center rounded-lg opacity-50 px-4 py-2 text-white absolute right-6 top-6 gap-2'
              htmlFor='fileInput'
            >
              <Pencil2Icon className='size-6' />
              <span className='leading-[171%] text-sm font-medium'>Изменить обложку</span>
            </Label>
          </div>
        </div>
      ) : backGroundImageFieldUrl ? (
        <div className='relative w-full'>
          <CustomImage src={backGroundImageFieldUrl} className='w-full h-[234px] rounded-t-lg' />
          <div className=''>
            <Input
              accept='image/*'
              onChange={(e) => changeImage(e, "backGroundImage")}
              id='fileInput'
              className='hidden'
              type='file'
            />
            <Label
              className='bg-slate-900 flex items-center rounded-lg opacity-50 px-4 py-2 text-white absolute right-6 top-6 gap-2'
              htmlFor='fileInput'
            >
              <Pencil2Icon className='size-6' />
              <span className='leading-[171%] text-sm font-medium'>Изменить обложку</span>
            </Label>
          </div>
        </div>
      ) : (
        <div className='w-full h-[234px] bg-slate-400 rounded-t-lg'>
          <div className='relative'>
            <Input
              accept='image/*'
              onChange={(e) => changeImage(e, "backGroundImage")}
              id='fileInput'
              className='hidden'
              type='file'
            />
            <Label
              className='bg-slate-900 flex items-center rounded-lg opacity-50 px-4 py-2 text-white absolute right-6 top-6 gap-2'
              htmlFor='fileInput'
            >
              <Pencil2Icon className='size-6' />
              <span className='leading-[171%] text-sm font-medium'>Изменить обложку</span>
            </Label>
          </div>
        </div>
      )}
      <div className='w-full max-w-[650px] space-y-2 relative mt-2 mb-8'>
        <Avatar
          isEdit
          size='profile'
          changeImage={changeImage}
          src={avatarFieldUrl ? avatarFieldUrl : "/images/user.webp"}
          alt='your avatar'
          className='absolute -top-[100px] -left-4'
        />
        <div className='flex items-center je'>
          <div className='bg-transparent w-[170px]' />
          <Heading variant='h3' tag='h3'>
            {fullName}
          </Heading>
        </div>
      </div>
    </>
  );
};
