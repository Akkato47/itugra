export const paths = {
  // Auth
  SIGNIN: "/signIn",
  SIGNUP: "/signUp",
  OAUTH_YANDEX: "/oauth/yandex-callback",

  // Authed Pages

  // Сайдбар профиля
  PROFILE: "/profile",
  EVENTS: "/events",
  MY_EVENTS: "myevents",
  CREATE_EVENT: "create-event",
  CREATED_EVENTS: "created-events",
  EVENT: "event",
  ALL_EVENTS: "allevents",
  MY_ROADMAP: "/myroadmap",
  SUPPORT_MEASURES: "/supportmeasures",
  TEAMS: "/profile/teams",
  NAVZLYOT: "/na-vzlyot",

  // Админ
  ADMIN: "/admin",
  ADMIN_REQUESTS: "requests",
  ADMIN_REQUESTS_HISTORY: "requests-history",
  ADMIN_MODERATION: "moderation",
  ADMIN_EVENTS: "events",
  ADMIN_USERS: "users",
  ADMIN_TEAMS: "teams",

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
