import {
  ArrowLeftIcon,
  BackpackIcon,
  InfoCircledIcon,
  LockClosedIcon,
  MixIcon
} from "@radix-ui/react-icons";

import { paths } from "@shared/constants/react-router";
import { ArticleIcon, EducationIcon } from "@shared/icons";

export const settingsSidebarItems = (userTag: string) => [
  {
    title: "Мой профиль",
    icon: <ArticleIcon opacity={0.9} className='size-5' />,
    link: `${paths.PROFILE}/${userTag}`
  },
  {
    title: "Личные данные",
    icon: <InfoCircledIcon className='size-5' />,
    link: paths.PERSONAL_DATA_SETTINGS
  },
  {
    title: "Безопасность и вход",
    icon: <LockClosedIcon className='size-5' fill='#0B1F33' />,
    link: paths.SECURITY_SETTINGS
  },
  {
    title: "Работа",
    icon: <BackpackIcon className='size-5' fill='#0B1F33' />,
    link: paths.WORK_EXPERIENCE_SETTINGS
  },
  {
    title: "Навыки",
    icon: <MixIcon className='size-5' fill='#0B1F33' />,
    link: paths.SKILLS_SETTINGS
  },
  {
    title: "Образование",
    icon: <EducationIcon className='size-5' fill='#0B1F33' />,
    link: paths.EDUCATION_SETTINGS
  },
  {
    title: "Назад",
    icon: <ArrowLeftIcon className='size-5' />,
    link: -1
  }
];
