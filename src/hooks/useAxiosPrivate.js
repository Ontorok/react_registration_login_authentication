import { useEffect } from "react";
import { privateAxiosInstance } from "../api/axios";
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = privateAxiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = privateAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateAxiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxiosInstance.interceptors.request.eject(requestInterceptor);
      privateAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return privateAxiosInstance;
};
