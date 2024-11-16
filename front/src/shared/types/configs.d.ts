/* eslint-disable @typescript-eslint/consistent-type-imports */
interface IUidConfig {
  config?: ApiRequestConfig;
  uid: string;
}

type TApiRequestConfig = Omit<import("axios").AxiosRequestConfig, "headers"> & {
  headers?: PlainObject;
};

type TRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import("axios").AxiosRequestConfig }
  : { params: Params; config?: import("axios").AxiosRequestConfig };
