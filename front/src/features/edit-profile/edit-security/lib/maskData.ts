import { formatePhone } from "@shared/lib/formatePhone";

export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  let visibleLocal;
  let maskedLocal;
  if (localPart.length === 1) {
    visibleLocal = localPart;
    maskedLocal = visibleLocal + "*";
  } else {
    visibleLocal = localPart.slice(0, 2);
    maskedLocal = visibleLocal + "*".repeat(localPart.length - 2);
  }
  return `${maskedLocal}@${domain}`;
};

export const maskPhone = (phone: string): string => {
  const formatedPhone = formatePhone(phone);
  const formatedPhoneArray = formatedPhone.split("");

  for (let i = 3; i < formatedPhoneArray.length - 2; i++) {
    formatedPhoneArray[i] = "*";
  }

  const maskedPhone = formatedPhoneArray.join("");
  return maskedPhone;
};
