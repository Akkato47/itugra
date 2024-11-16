export enum EoAuth {
  YANDEX = "yandexApi",
  VK = "vkApi"
}

export interface IoAuthResponse {
  type: EoAuth;
  code: string;
}
