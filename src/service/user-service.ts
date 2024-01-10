import { ChangeTrainingStatusPayload, DeleteDormantUserPayload, DeleteUserPayload, User, UserQuery, ValidateUsernamePayload 
} from "@/model/user";
import { request } from "./axios-config";


export const getUserById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/get-by-id', method: 'GET', params});
}

export const getUserDropdown = () => {
  return request({url: 'User/dropdowns', method: 'GET'});
}

export const getSiteDetailWithProtocol = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/site-detail-with-protocols', method: 'GET', params});
}

export const getTrainingsByProtocol = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User//get-trainings-by-protocols', method: 'GET', params});
}

export const getProtocolBySponsor = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/get-protocols-by-sponsor', method: 'GET', params});
}

export const getUsers = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/get', method: 'GET', params});
}

export const addUser = (data: User) => {
  return request({url: 'User', method: 'POST', data});
}

export const editUser = (data: User) => {
  return request({url: 'User', method: 'PUT', data});
} 

export const validateUserName = (data: ValidateUsernamePayload) => {
  return request({url: 'User/validate-username', method: 'POST', data});
}

export const deleteUser = (data: DeleteUserPayload) => {
  return request({url: 'User', method: 'DELETE', data});
}


export const getDormantUsers = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/dormant-users', method: 'GET', params});
}

export const deleteDormantUsers = (data: any) => {
  return request({url: 'User/dormant-users', method: 'DELETE', data});
}

export const changeTrainingStatus = (data: ChangeTrainingStatusPayload) => {
  return request({url: 'User/change-training-status', method: 'POST', data});
}

