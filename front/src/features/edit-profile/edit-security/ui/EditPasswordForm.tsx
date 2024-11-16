import type { z } from "zod";

import { Button, Label, PasswordInput } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@shared/ui/form";

import { useUpdatePasswordMutation } from "../api/hooks/useUpdatePasswordMutation";
import type { editPasswordFormShema } from "../lib/editPasswordFormShema";
import { useEditPasswordForm } from "../model/useEditPasswordForm";

export const EditPasswordForm = () => {
  const editPasswordForm = useEditPasswordForm();

  const { mutate } = useUpdatePasswordMutation();

  const updatePassword = (data: z.infer<typeof editPasswordFormShema>) => {
    if (data.newPassword !== data.repeatedPassword) {
      editPasswordForm.setError("repeatedPassword", {
        message: "Пароли не совпадают",
        type: "validate"
      });
      return;
    }
    mutate({
      params: {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword
      }
    });
  };

  return (
    <Form {...editPasswordForm}>
      <form
        onSubmit={editPasswordForm.handleSubmit(updatePassword)}
        className='flex items-center justify-center flex-col gap-10 mt-2'
      >
        <FormField
          control={editPasswordForm.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <Label className='font-bold leading-[150%]'>Введите текущий пароль</Label>
              <FormControl>
                <PasswordInput autoCorrect='off' autoCapitalize='none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editPasswordForm.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <Label className='font-bold leading-[150%]'>Введите новый пароль</Label>
              <FormControl>
                <PasswordInput autoCorrect='off' autoCapitalize='none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editPasswordForm.control}
          name='repeatedPassword'
          render={({ field }) => (
            <FormItem>
              <Label className='font-bold leading-[150%]'>Введите новый пароль повторно</Label>
              <FormControl>
                <PasswordInput autoCorrect='off' autoCapitalize='none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size='lg'>Подтвердить</Button>
      </form>
    </Form>
  );
};
