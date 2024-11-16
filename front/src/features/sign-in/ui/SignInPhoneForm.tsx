import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import type { z } from "zod";

import { Button, Input, Label, PasswordInput } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@shared/ui/form";

import { signInPhoneFormSchema } from "../lib/sign-in-phone-form-schema";

interface ISignInPhoneFormProps {
  signIn: (data: z.infer<typeof signInPhoneFormSchema>) => void;
}

export const SignInPhoneForm = ({ signIn }: ISignInPhoneFormProps) => {
  const signInPhoneForm = useForm<z.infer<typeof signInPhoneFormSchema>>({
    resolver: zodResolver(signInPhoneFormSchema),
    defaultValues: {
      phone: "",
      password: ""
    }
  });

  return (
    <Form {...signInPhoneForm}>
      <form
        onSubmit={signInPhoneForm.handleSubmit(signIn)}
        className='flex items-center justify-center flex-col gap-6'
      >
        <FormField
          control={signInPhoneForm.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <Label>Номер телефона</Label>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Номер телефона'
                  format='+7 (###) ### ## ##'
                  allowEmptyFormatting
                  mask='_'
                  component={PatternFormat}
                  className='w-[360px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInPhoneForm.control}
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
