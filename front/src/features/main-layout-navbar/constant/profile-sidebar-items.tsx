import { RocketIcon } from "@radix-ui/react-icons";

import { paths } from "@shared/constants/react-router";
import { ArticleIcon, SupportIcon, TeamIcon, TimetableIcon } from "@shared/icons";

export const profileSidebarItems = [
  {
    title: "Мои мероприятия",
    icon: <TimetableIcon />,
    link: `${paths.PROFILE}/${paths.MY_EVENTS}`
  },
  {
    title: "На взлёт!",
    icon: <RocketIcon />,
    link: paths.NAVZLYOT
  },
  {
    title: "Мой профиль",
    icon: <ArticleIcon opacity={0.9} />,
    link: paths.PROFILE
  },
  {
    title: "Моя команда",
    icon: <TeamIcon />,
    link: paths.TEAMS
  },
  {
    title: "Меры поддержки",
    icon: <SupportIcon />,
    link: paths.SUPPORT_MEASURES
  }
];
