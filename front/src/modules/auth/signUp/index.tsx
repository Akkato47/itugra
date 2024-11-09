import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { Link } from "react-router-dom";
import type { z } from "zod";

import { PATHS } from "@shared/constants";
import { Button } from "@shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { PasswordInput } from "@shared/ui/password-input";

import { signUpSchema } from "./lib/signUpSchema";
import { useSignUp } from "./model/useSignUp";

const SignUpPage = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      phone: "",
      role: "user",
      mail: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { onSubmit, registerMutation } = useSignUp();

  const isDisabled =
    !form.formState.dirtyFields.firstName ||
    !form.formState.dirtyFields.confirmPassword ||
    !form.formState.dirtyFields.mail ||
    !form.formState.dirtyFields.password ||
    !form.formState.dirtyFields.phone ||
    !form.formState.dirtyFields.secondName;

  return (
    <Card className='m-auto w-full max-w-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>Регистрация</CardTitle>
        <CardDescription>Введите свои данные для создания учетной записи</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='flex items-center gap-5'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя*</FormLabel>
                    <FormControl>
                      <Input placeholder='Введите имя' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='secondName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия*</FormLabel>
                    <FormControl>
                      <Input placeholder='Введите фамилию' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона*</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Номер телефона'
                      format='+7 (###) ### ## ##'
                      mask='_'
                      component={PatternFormat}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder='Введите почту' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль*</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Введите пароль' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подтвердите пароль*</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Введите пароль' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={registerMutation.isPending || isDisabled}
              type='submit'
              className='w-full'
            >
              Создать учетную запись
            </Button>
          </form>
        </Form>

        <div className='mt-4 text-center text-sm'>
          У вас уже есть учетная запись?{" "}
          <Link to={PATHS.SIGNIN} className='underline'>
            Войти
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
