import { useState } from "react";
import { Link } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { generateUUIDv4 } from "@shared/lib/generateUUIDv4";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { EmailForm } from "./_components/EmailForm";
import { PhoneForm } from "./_components/PhoneForm";
import { useSignIn } from "./model/useSignIn";

const SignInPage = () => {
  const [formType, setFormType] = useState("mail");
  const {
    onSubmit,
    posLoginMutation: { isPending }
  } = useSignIn();

  return (
    <Card className='m-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Вход</CardTitle>
      </CardHeader>
      <CardContent>
        {formType === "mail" && (
          <EmailForm
            onSubmit={onSubmit}
            switchForm={() => setFormType("phone")}
            isPending={isPending}
          />
        )}
        {formType === "phone" && (
          <PhoneForm
            onSubmit={onSubmit}
            switchForm={() => setFormType("mail")}
            isPending={isPending}
          />
        )}
        <div className='flex justify-center items-center mt-3'>
          <Link
            to={`${process.env.BASE_YANDEX_API_URL}/authorize?response_type=code&client_id=${process.env.YANDEX_CLIENT_ID}&redirect_uri=${process.env.YANDEX_REDIRECT_URI}&device_id=${generateUUIDv4()}`}
          >
            <img className='size-10' src='/Yandex_icon.png' alt='yandex_oAuth' />
          </Link>
        </div>
        <div className='mt-4 text-center text-sm'>
          У вас нет учетной записи?{" "}
          <Link to={PATHS.SIGNUP} className='underline'>
            Зарегестрироваться
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
