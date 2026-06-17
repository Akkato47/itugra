import { FileIcon } from "@radix-ui/react-icons";
import { type ChangeEvent } from "react";
import { PatternFormat } from "react-number-format";
import type { z } from "zod";

import { ETypeEventEnum } from "@entities/event";

import { postUpload } from "@shared/api";
import { formateDate } from "@shared/lib/formateDate";
import { toast } from "@shared/model/use-toast";
import { Button, Checkbox, CustomImage, Input, Label, Textarea } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select";

import { usePostCreateEventMutation } from "../api/usePostCreateEventMutation";
import { categoryData } from "../constants/categoryData.constant";
import type { createEventFormSchema } from "../lib/createEventFormSchema";
import { useCreateEventForm } from "../model/useCreateEventForm";

export const CreateEventRequestForm = () => {
  const createEventForm = useCreateEventForm();
  const { mutateAsync } = usePostCreateEventMutation();

  const image = createEventForm.watch("image");

  const changeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files && e.target.files[0];
    if (!fileData) return;

    const extension = fileData.name.split(".").at(-1)?.toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    if (extension && !imageExtensions.includes(extension)) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Невалидное расширение",
        description: ".jpg .jpeg .png .gif .bmp .svg .webp"
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", fileData);

    try {
      const res = await postUpload({ formData });
      createEventForm.setValue(
        "image",
        {
          name: res.data.name,
          fileUrl: res.data.url,
          uid: res.data.uid,
          thumbnailUrl: res.data.thumbnail.url
        },
        { shouldDirty: true }
      );
    } catch (err: any) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось загрузить изображение",
        description: err?.response?.data?.message
      });
    }
  };

  const createEvent = async (data: z.infer<typeof createEventFormSchema>) => {
    await mutateAsync({
      params: {
        name: data.name,
        description: data.description,
        type: data.type,
        image: data.image,
        end: formateDate(data.end, "dash"),
        registrationEnd: formateDate(data.registrationEnd, "dash"),
        categoryId: data.categoryId
      }
    });
  };

  const categoryOptions = Object.entries(categoryData).map(([label, value]) => ({
    label,
    value
  }));

  return (
    <Form {...createEventForm}>
      <form onSubmit={createEventForm.handleSubmit(createEvent)} className='space-y-7'>
        <div className='flex gap-4'>
          <div className='space-y-7'>
            <FormField
              control={createEventForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-foreground'>Название мероприятия</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      type='text'
                      placeholder='Введите название команды'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createEventForm.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-foreground'>Тип мероприятия</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Выберите тип мероприятия' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ETypeEventEnum.HACKATON}>Хакатон</SelectItem>
                      <SelectItem value={ETypeEventEnum.MEETUP}>Конференция</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='w-full'>
            <Input
              id='eventImageInput'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={changeImage}
            />
            <Label
              htmlFor='eventImageInput'
              className='relative block overflow-hidden rounded-lg cursor-pointer w-full h-[200px] border-2 border-dashed border-border text-sm hover:bg-gray-100'
            >
              {image?.fileUrl ? (
                <CustomImage
                  src={image.fileUrl}
                  alt='event preview'
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-2 flex items-center flex-col'>
                  <FileIcon className='size-12' />
                  <p className='opacity-60'>Загрузите фото в формате .PNG или .JPEG</p>
                  <p className='opacity-60'>Максимальный размер файла: 10 МБ</p>
                </div>
              )}
            </Label>
          </div>
        </div>
        <div className='grid grid-cols-[200px_200px]'>
          <FormField
            control={createEventForm.control}
            name='registrationEnd'
            render={({ field }) => (
              <FormItem>
                <Label className='font-bold text-foreground'>Окончание регистрации</Label>
                <FormControl>
                  <Input
                    type='text'
                    className='w-[152px] h-9'
                    placeholder='01.01.2000'
                    format='##.##.####'
                    mask='_'
                    component={PatternFormat}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='ml-0' />
              </FormItem>
            )}
          />
          <FormField
            control={createEventForm.control}
            name='end'
            render={({ field }) => (
              <FormItem>
                <Label className='font-bold text-foreground'>Окончание мероприятия</Label>
                <FormControl>
                  <Input
                    type='text'
                    className='w-[152px] h-9'
                    placeholder='01.01.2000'
                    format='##.##.####'
                    mask='_'
                    component={PatternFormat}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='ml-0' />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={createEventForm.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-foreground'>Категории</FormLabel>
              <FormControl>
                <div className='flex items-center gap-5'>
                  {categoryOptions.map((option) => (
                    <div key={option.value} className='flex items-center gap-2'>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...(field.value || []), option.value]);
                          } else {
                            field.onChange((field.value || []).filter((v) => v !== option.value));
                          }
                        }}
                        id={`category-${option.value}`}
                      />
                      <label
                        htmlFor={`category-${option.value}`}
                        className='text-sm font-medium text-gray-900'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg font-bold text-foreground'>Описание мероприятия</FormLabel>
              <FormControl>
                <Textarea
                  autoComplete='off'
                  placeholder='Введите описание мероприятия '
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={
            !createEventForm.formState.dirtyFields.name ||
            !createEventForm.formState.dirtyFields.description ||
            !createEventForm.formState.dirtyFields.type ||
            !createEventForm.getValues("categoryId")?.length
          }
        >
          Создать мероприятие
        </Button>
      </form>
    </Form>
  );
};
