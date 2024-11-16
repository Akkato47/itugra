import { paths } from "@shared/constants/react-router";
import { ArticleIcon, BallonIcon, SupportIcon, TeamIcon, TimetableIcon } from "@shared/icons";

export const profileSidebarItems = [
  {
    title: "Мои мероприятия",
    icon: <TimetableIcon />,
    link: paths.MY_EVENTS
  },
  {
    title: "Мой путь",
    icon: <BallonIcon fill='#0B1F33' />,
    link: paths.MY_ROADMAP
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
