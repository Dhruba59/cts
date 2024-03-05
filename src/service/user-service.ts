import { ChangeTrainingStatusPayload, DeleteDormantUserPayload, DeleteUserPayload, User, UserQuery, ValidateUsernamePayload 
} from "@/model/user";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios: any = axiosApi()

export const getUserById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'User/get-by-id', method: 'GET', params});
}

export const getUserDropdown = () => {
  return requestAxios({url: 'User/dropdowns', method: 'GET'});
}

export const getSiteDetailWithProtocol = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'User/site-detail-with-protocols', method: 'GET', params});
}

export const getTrainingsByProtocol = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'User//get-trainings-by-protocols', method: 'GET', params});
}

export const getProtocolBySponsor = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'User/get-protocols-by-sponsor', method: 'GET', params});
}

export const getUsers = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'User/get', method: 'GET', params});
}

export const addUser = (data: User) => {
  return requestAxios({url: 'User', method: 'POST', data});
}

export const editUser = (data: User) => {
  return requestAxios({url: 'User', method: 'PUT', data});
} 

export const validateUserName = (data: ValidateUsernamePayload) => {
  return requestAxios({url: 'User/validate-username', method: 'POST', data});
}

export const deleteUser = (data: DeleteUserPayload) => {
  return requestAxios({url: 'User', method: 'DELETE', data});
}


export const getDormantUsers = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'User/dormant-users', method: 'GET', params});
}

export const deleteDormantUsers = (data: any) => {
  return requestAxios({url: 'User/dormant-users', method: 'DELETE', data});
}

export const changeTrainingStatus = (data: ChangeTrainingStatusPayload) => {
  return requestAxios({url: 'User/change-training-status', method: 'POST', data});
}

