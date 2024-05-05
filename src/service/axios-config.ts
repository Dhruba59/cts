import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { Apikey: process.env.NEXT_PUBLIC_API_KEY },
});

instance.interceptors.request.use(async (request) => {

  //const accessToken = getCookie("accessToken");
  //console.log(accessToken);
  
  const session = await getSession();
  //@ts-ignore
  const accessToken = session?.user?.token?.accessToken;
  //console.log(accessToken);

  if (typeof window !== "undefined") {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return request;
});

export const request = async ({ ...options }: AxiosRequestConfig) => {
  return instance(options);
};
