import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken } from "@/utils/helpers";

export const axioInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export const request = async ({ ...options }: AxiosRequestConfig) => {
  if(typeof window !== 'undefined') {
    axioInstance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
  }
  axioInstance.defaults.headers.common.Apikey = process.env.NEXT_PUBLIC_API_KEY;
  console.log(axioInstance(options));
  return axioInstance(options);
}
