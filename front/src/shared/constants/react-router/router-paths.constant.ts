export const paths = {
  // Auth
  SIGNIN: "/signIn",
  SIGNUP: "/signUp",
  OAUTH_YANDEX: "/oauth/yandex-callback",

  // Authed Pages

  // Сайдбар профиля
  PROFILE: "/profile",
  MY_EVENTS: "/myevents",
  ALL_EVENTS: "/allevents",
  MY_ROADMAP: "/myroadmap",
  SUPPORT_MEASURES: "/supportmeasures",
  TEAMS: "/profile/teams",

  // Настройки
  SETTINGS: "/settings",
  PERSONAL_DATA_SETTINGS: "/settings/personal-data",
  SECURITY_SETTINGS: "/settings/security",
  WORK_EXPERIENCE_SETTINGS: "/settings/work-epxperience",
  SKILLS_SETTINGS: "/settings/skills",
  EDUCATION_SETTINGS: "/settings/education",

  SHARE: "/share",
  SUPPORT: "/support"
} as const;
