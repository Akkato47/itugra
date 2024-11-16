import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

import { EditMailForm, EditPasswordForm, EditPhoneForm } from "@features/edit-profile/index";

import { PhoneIcon } from "@shared/icons";

export const securityItems = [
  {
    icon: <PhoneIcon className='size-6' />,
    name: "Телефон",
    modal: <EditPhoneForm />,
    dialogTitle: "Сменить номер телефона"
  },
  {
    icon: <EnvelopeClosedIcon className='size-6' />,
    name: "Основная почта",
    modal: <EditMailForm />,
    dialogTitle: "Изменить адрес электронной почты"
  },
  {
    icon: <LockClosedIcon className='size-6' />,
    name: "Пароль",
    modal: <EditPasswordForm />,
    dialogTitle: "Смена пароля"
  }
];
