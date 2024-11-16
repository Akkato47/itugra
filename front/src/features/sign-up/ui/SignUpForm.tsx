import { PatternFormat } from "react-number-format";

import { Button, Input, PasswordInput } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@shared/ui/form";

import { useSignUp } from "../model/useSignUp";
import { useSignUpForm } from "../model/useSignUpForm";

export const SignUpForm: React.FC = () => {
  const regForm = useSignUpForm();
  const { registration } = useSignUp({ regForm });

  return (
    <Form {...regForm}>
      {/* <SwitchInput
        setValue={setRole}
        selectedValue={role}
        firstValue='USER'
        secondValue='ORG'
        fristFieldName='Я айтишник'
        secondFieldName='Я организатор'
      /> */}
      <form
        onSubmit={regForm.handleSubmit(registration)}
        className='flex items-center justify-center flex-col gap-10 mt-2'
      >
        <FormField
          control={regForm.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='ФИО' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={regForm.control}
          name='mail'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={regForm.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
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
          control={regForm.control}
          name='birthDate'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Дата рождения'
                  format='##.##.####'
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
          control={regForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  autoCorrect='off'
                  autoCapitalize='none'
                  placeholder='Введите пароль'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={regForm.control}
          name='repeatedPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  autoCorrect='off'
                  autoCapitalize='none'
                  placeholder='Введите пароль еще раз'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size='lg'>Зарегистрироваться</Button>
      </form>
    </Form>
  );
};
