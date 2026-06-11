import type { z } from "zod";

import { Label, PasswordInput } from "@shared/ui";
import { Button } from "@shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@shared/ui/form";
import { Input } from "@shared/ui/input";

import type { signInEmailFormSchema } from "../lib/sign-in-email-form-schema";
import { useSignInForm } from "../model/useSignInForm";

interface ISignInEmailFormProps {
  signIn: (data: z.infer<typeof signInEmailFormSchema>) => void;
}

export const SignInEmailForm = ({ signIn }: ISignInEmailFormProps) => {
  const signInEmailForm = useSignInForm();
  return (
    <Form {...signInEmailForm}>
      <form
        onSubmit={signInEmailForm.handleSubmit(signIn)}
        className='flex items-center justify-center flex-col gap-6'
      >
        <FormField
          control={signInEmailForm.control}
          name='mail'
          render={({ field }) => (
            <FormItem>
              <Label>Электронная почта</Label>
              <FormControl>
                <Input type='text' className='w-[360px]' placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInEmailForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <Label>Пароль</Label>
              <FormControl>
                <PasswordInput className='w-[360px]' placeholder='Введите пароль' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' size='lg' className='mt-4'>
          Авторизоваться
        </Button>
      </form>
    </Form>
  );
};
