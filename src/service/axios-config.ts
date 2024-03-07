import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, setTokens } from "@/utils/helpers";
import { STORAGE_KEY } from "@/constants/storage-constant";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { Apikey: process.env.NEXT_PUBLIC_API_KEY },
});

instance.interceptors.request.use(async (request) => {
  if (typeof window !== "undefined") {
    request.headers["Authorization"] = `Bearer ${getAccessToken()}`;
  }
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call your API to refresh the token
        const refreshedSession = await instance.post("/auth/refresh", {
          refreshToken: getRefreshToken(),
        });
        // Update Next-Auth session and request header
        setTokens(refreshedSession.data);
        // replace header token with new token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshedSession.data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // remove old token if refresh token failed
        localStorage.removeItem(STORAGE_KEY.AUTH_TOKEN);
        // set removeSession to true to remove session from next-auth
        localStorage.setItem("removeSession", JSON.stringify(true));
        // reject with failed refresh token error
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const request = async ({ ...options }: AxiosRequestConfig) => {
  return instance(options);
};
