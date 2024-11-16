import { FileIcon } from "@radix-ui/react-icons";
import { PatternFormat } from "react-number-format";
import type { z } from "zod";

import { ETypeEventEnum } from "@entities/event";

import { formateDate } from "@shared/lib/formateDate";
import { Button, Checkbox, Input, Label, Textarea } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select";

import { usePostCreateEventMutation } from "../api/usePostCreateEventMutation";
import { categoryData } from "../constants/categoryData.constant";
import type { createEventFormSchema } from "../lib/createEventFormSchema";
import { useCreateEventForm } from "../model/useCreateEventForm";

export const CreateEventRequestForm = () => {
  const createEventForm = useCreateEventForm();
  const { mutateAsync } = usePostCreateEventMutation();

  const createEvent = async (data: z.infer<typeof createEventFormSchema>) => {
    await mutateAsync({
      params: {
        name: data.name,
        description: data.description,
        type: data.type,
        image: {
          uid: "string",
          name: "string",
          fileUrl: "string",
          thumbnailUrl: "string"
        },
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
                  <FormLabel className='font-bold text-black'>Название мероприятия</FormLabel>
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
                  <FormLabel className='font-bold text-black'>Тип мероприятия</FormLabel>
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
          <div className='relative rounded-lg cursor-pointer w-full h-[200px] border-2 border-dashed border-slate-300 text-sm hover:bg-gray-100'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-2 flex items-center flex-col'>
              <FileIcon className='size-12' />
              <p className='opacity-60'>Загрузите фото в формате .PNG или .JPEG</p>
              <p className='opacity-60'>Максимальный размер файла: 10 МБ</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-[200px_200px]'>
          <FormField
            control={createEventForm.control}
            name='registrationEnd'
            render={({ field }) => (
              <FormItem>
                <Label className='font-bold text-black'>Окончание регистрации</Label>
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
                <Label className='font-bold text-black'>Окончание мероприятия</Label>
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
              <FormLabel className='font-bold text-black'>Категории</FormLabel>
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
              <FormLabel className='text-lg font-bold text-black'>Описание мероприятия</FormLabel>
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
