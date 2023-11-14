import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken } from "@/utils/helpers";

export const axioInstance = axios.create({
  baseURL: process.env.API_BASE_URL
});

export const request = async ({ ...options }: AxiosRequestConfig) => {
  if(typeof window !== 'undefined') {
    axioInstance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
  }
  axioInstance.defaults.headers.common.Apikey = process.env.API_KEY;
  
  return axioInstance(options);
}
