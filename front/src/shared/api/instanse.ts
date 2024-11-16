import axios from "axios";

import { paths } from "@shared/constants/react-router";

export const api = axios.create({
  baseURL: import.meta.env.BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== "/") {
        window.location.href = paths.SIGNIN;
      }
    }
    return Promise.reject(error);
  }
);
