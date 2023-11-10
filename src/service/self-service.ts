import { request } from "./axios-service";

export interface ChangePassPayload {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

export interface MatchCurrentPassPayload {
  password: string;
}

export const change_password = (data: ChangePassPayload) => {
  return request({url: 'User/change-password', method: 'post', data});
}

export const match_current_password = (data: MatchCurrentPassPayload) => {
  return request({url: 'User/match-current-password', method: 'post', data});
}
