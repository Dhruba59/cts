import { request } from "./axios-config";
import { LoginPayload, RefreshTokenPayload } from "@/model/login";
import { ForgetPassPayload } from "@/model/forget-pass";

export const login = (data: LoginPayload) => {
  return request({url: 'Auth/login', method: 'post', data})
}

export const forget_password = (data: ForgetPassPayload) => {
  return request({url: 'Auth/forgot-password', method: 'post', data});
}

export const refreshToken = (data: RefreshTokenPayload) => {
  return request({ url: 'Auth/refresh', method: 'post', data})
}
