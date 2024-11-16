import { Link } from "react-router-dom";

import { OauthGrid } from "@features/o-auth";
import { SignUpForm } from "@features/sign-up";

import { paths } from "@shared/constants/react-router";
import { Button, Heading } from "@shared/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@shared/ui/dialog";

const SignUpPage = () => (
  <main className='flex items-center justify-center h-screen'>
    <div className='flex items-center justify-center flex-col gap-8 w-full max-w-[360px]'>
      <Heading>Регистрация</Heading>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full' size='lg'>
            Через почту или телефон
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>С помощью эл. почты или телефона</DialogTitle>
          </DialogHeader>
          <SignUpForm />
        </DialogContent>
      </Dialog>
      <OauthGrid />
      <nav className='flex flex-col items-center gap-4'>
        <Link className='text-lg font-semibold underline leading-[140%]' to={paths.SIGNIN}>
          Уже есть аккаунт?
        </Link>
        <p className='leading-[171%] text-center'>
          Регистрируясь, вы принимаете{" "}
          <Link className='underline text-slate-700' to={"#"}>
            пользовательское соглашение
          </Link>{" "}
          и{" "}
          <Link className='underline text-slate-700' to={"#"}>
            политику конфиденциальности
          </Link>
        </p>
      </nav>
    </div>
  </main>
);

export default SignUpPage;
