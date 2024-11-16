import { useEffect, useState } from "react";

import {
  Button,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label
} from "@shared/ui";

import { mailSchema } from "../lib/editMailShemas";
import { maskEmail } from "../lib/maskData";

export const EditMailForm = () => {
  const [mailForm, setMailForm] = useState({
    mail: "",
    isSuccess: false
  });

  const [otp, setOtp] = useState<string>("");

  const [formType, setFormType] = useState<"mail" | "otp">("mail");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailForm((prev) => ({ ...prev, mail: e.target.value }));
    const result = mailSchema.safeParse({ mail: e.target.value });
    if (result.success) {
      setMailForm((prev) => ({ ...prev, isSuccess: true }));
    } else {
      setMailForm((prev) => ({ ...prev, isSuccess: false }));
    }
  };

  const submitEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormType("otp");
  };

  useEffect(() => {
    const sendOtp = () => {
      if (otp.length === 6) {
        console.log(otp);
      }
    };

    sendOtp();
  }, [otp]);

  return (
    <form className='flex items-center flex-col gap-7 mt-2'>
      {formType === "mail" && (
        <>
          <div className='space-y-3'>
            <Label className='leading-[150%] font-medium text-base'>Введите новую почту</Label>
            <Input value={mailForm.mail} onChange={inputHandler} placeholder='example@mail.ru' />
          </div>
          <Button disabled={!mailForm.isSuccess} size='lg' onClick={submitEmail}>
            Подтвердить
          </Button>
        </>
      )}
      {formType === "otp" && (
        <>
          <div className='mb-5 flex items-center flex-col gap-5'>
            <Label className='leading-[150%] font-medium text-base text-center'>
              Код подтверждения отправлен на почту {maskEmail(mailForm.mail)}
            </Label>
            <InputOTP maxLength={6} onChange={(e) => setOtp(e)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </>
      )}
    </form>
  );
};
