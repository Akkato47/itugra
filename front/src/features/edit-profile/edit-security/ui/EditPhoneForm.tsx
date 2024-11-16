/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";

import { useUser } from "@entities/user";

import {
  Button,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label
} from "@shared/ui";

import { maskPhone } from "../lib/maskData";

export const EditPhoneForm = () => {
  const [phoneForm, setPhoneForm] = useState({
    phone: "",
    isSuccess: false
  });
  const { user } = useUser();

  const [otp, setOtp] = useState<string>("");

  const [formType, setFormType] = useState<"phone" | "otp">("phone");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneForm((prev) => ({ ...prev, phone: e.target.value }));
    if (e.target.value[17] !== "_") setPhoneForm((prev) => ({ ...prev, isSuccess: true }));
  };

  const submitPhone = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
      {formType === "phone" && (
        <>
          <div className='space-y-3'>
            <Label className='leading-[150%] font-medium text-base'>Введите номер телефона</Label>
            <Input
              type='text'
              placeholder='Номер телефона'
              value={phoneForm.phone}
              format='+7 (###) ### ## ##'
              onChange={inputHandler}
              allowEmptyFormatting
              mask='_'
              component={PatternFormat}
            />
          </div>
          <Button disabled={!phoneForm.isSuccess} size='lg' onClick={submitPhone}>
            Подтвердить
          </Button>
        </>
      )}
      {formType === "otp" && (
        <>
          <div className='mb-5 flex items-center flex-col gap-5'>
            <Label className='leading-[150%] font-medium text-base text-center'>
              Код подтверждения отправлен на номер {maskPhone(user!.shortInfo.phone)}
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
