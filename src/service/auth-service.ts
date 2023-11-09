import { request } from "./axios-service";
import { LoginPayload } from "@/model/login";
import { ForgetPassPayload } from "@/model/forget-pass";

export const login = (data: LoginPayload) => {
  return request({url: 'Auth/login', method: 'post', data})
}

export const forget_password = (data: ForgetPassPayload) => {
  return request({url: 'Auth/forgot-password', method: 'post', data});
}
