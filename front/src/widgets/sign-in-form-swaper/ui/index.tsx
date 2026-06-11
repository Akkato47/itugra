import { useState } from "react";

import { OauthGrid } from "@features/o-auth";
import { SignInEmailForm, SignInPhoneForm } from "@features/sign-in";
import { useSignIn } from "@features/sign-in";

import { SwitchInput } from "@shared/ui";

export const SignInFormSwaper = () => {
  const { signIn } = useSignIn();
  const [formType, setFormType] = useState("mail");

  return (
    <div className='flex items-center gap-20'>
      <div className='space-y-8'>
        <SwitchInput
          setValue={setFormType}
          selectedValue={formType}
          firstValue='mail'
          secondValue='phone'
          fristFieldName='Почта'
          secondFieldName='Телефон'
        />
        {formType === "mail" && <SignInEmailForm signIn={signIn} />}
        {formType === "phone" && <SignInPhoneForm signIn={signIn} />}
      </div>
      <OauthGrid />
    </div>
  );
};
