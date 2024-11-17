/* eslint-disable @typescript-eslint/consistent-type-imports */
type ApiRequestConfig<Params = undefined> = import("axios").AxiosRequestConfig<Params>;

interface IUidConfig {
  config?: ApiRequestConfig;
  uid: string;
}

type TApiRequestConfig = Omit<import("axios").AxiosRequestConfig, "headers"> & {
  headers?: PlainObject;
};

type TRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig<Params> };

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import("axios").AxiosRequestConfig }
  : { params: Params; config?: import("axios").AxiosRequestConfig };
