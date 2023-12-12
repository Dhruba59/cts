import { DeleteUserPayload, User, UserQuery 
} from "@/model/user";
import { request } from "./axios-config";


export const getUserById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/GetById', method: 'GET', params});
}

export const getDormantUsers = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/dormant-users', method: 'GET', params});
}

export const getUsers = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'User/Get', method: 'GET', params});
}

export const addUser = (data: User) => {
  return request({url: 'User', method: 'POST', data});
}

export const editUser = (data: User) => {
  return request({url: 'User', method: 'PUT', data});
} 

export const deleteUser = (data: DeleteUserPayload) => {
  return request({url: 'User', method: 'DELETE', data});
}
