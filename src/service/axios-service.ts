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
  const onSuccess = (response: any) => {
    return { data: response.data };
  }
  const onError = (error: any) => {
    return { error: error.response.data };
  }
  return await axioInstance(options).then(onSuccess).catch(onError);
}
