import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { PasswordInput } from "@shared/ui/password-input";

import { signInMailSchema } from "../lib/signInMailSchema";

interface MailFormProps {
  onSubmit: (values: z.infer<typeof signInMailSchema>) => Promise<void>;
  switchForm: () => void;
  isPending: boolean;
}

export const EmailForm = ({ onSubmit, switchForm, isPending }: MailFormProps) => {
  const signInMailForm = useForm<z.infer<typeof signInMailSchema>>({
    resolver: zodResolver(signInMailSchema),
    defaultValues: {
      mail: "",
      password: ""
    }
  });

  return (
    <Form {...signInMailForm}>
      <form onSubmit={signInMailForm.handleSubmit(onSubmit)} className='grid gap-4'>
        <FormField
          control={signInMailForm.control}
          name='mail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder='Введите почту' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInMailForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Введите пароль' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={switchForm} size='sm' variant='link' type='button'>
          Войти по номеру телефона
        </Button>
        <Button
          disabled={
            !signInMailForm.formState.dirtyFields.password ||
            !signInMailForm.formState.dirtyFields.mail ||
            isPending
          }
          type='submit'
          className='w-full'
        >
          Войти
        </Button>
      </form>
    </Form>
  );
};
