import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { getApiKey, getApiBaseUrl } from "@/utils/server-functions";


const instance = axios.create();
instance.interceptors.request.use(async (request) => {
  const session = await getSession();
  const apiKey = await getApiKey();
  request.baseURL = await getApiBaseUrl();
  request.headers['Apikey'] = apiKey ? apiKey : '';
  //@ts-ignore
  const accessToken = session?.user?.token?.accessToken;
  if (typeof window !== "undefined") {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return request;
});

export const request = async ({ ...options }: AxiosRequestConfig) => {
  return instance(options);
};
