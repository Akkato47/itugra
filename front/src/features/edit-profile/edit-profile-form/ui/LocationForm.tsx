import type { z } from "zod";

import type { IUserLocation } from "@entities/user";

import { Button } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";
import { Input } from "@shared/ui/input";

import type { locationFormSchema } from "../lib/location-form-schema";
import { useLocationForm } from "../model/useLocationForm";

export interface ILocationFormProps {
  location: IUserLocation | null;
  setUserLcoation: (locationValue: IUserLocation) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LocationForm = ({ location, setUserLcoation, setIsOpen }: ILocationFormProps) => {
  const locationForm = useLocationForm(location);
  const updateUserLocation = (data: z.infer<typeof locationFormSchema>) => {
    setUserLcoation(data);
    setIsOpen(false);
  };

  return (
    <Form {...locationForm}>
      <form
        onSubmit={locationForm.handleSubmit(updateUserLocation)}
        className='flex flex-col items-center justify-center gap-7 mt-5'
      >
        <FormField
          control={locationForm.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-2 font-bold'>Страна</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Введите страну' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={locationForm.control}
          name='region'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-2 font-bold'>Регион</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Выберите регион' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={locationForm.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='pb-2 font-bold text-black'>Город</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Введите город' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-5' size='lg' disabled={!locationForm.formState.isDirty}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
