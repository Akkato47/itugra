import { useEffect } from "react";
import { Link } from "react-router-dom";

import { SignInFormSwaper } from "@widgets/sign-in-form-swaper";

import { useUser } from "@entities/user";

import { paths } from "@shared/constants/react-router/router-paths.constant";
import { Heading } from "@shared/ui";

const SignInPage = () => {
  const is_auth = localStorage.getItem("IS_AUTH");
  const { setUserContextData } = useUser();

  useEffect(() => {
    if (is_auth && is_auth === "false") {
      localStorage.removeItem("IS_AUTH");
      setUserContextData(undefined);
    }
  }, []);

  return (
    <main className='flex items-center justify-center h-screen'>
      <div className='flex items-center justify-center flex-col gap-8'>
        <Heading>Вход</Heading>
        <SignInFormSwaper />
        <nav className='flex flex-col items-center text-lg font-semibold underline leading-[140%]'>
          <Link to='#'>Забыли пароль?</Link>
          <Link to={paths.SIGNUP}>Зарегистрироваться</Link>
        </nav>
      </div>
    </main>
  );
};

export default SignInPage;
