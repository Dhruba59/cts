import { STORAGE_KEY } from '@/constants/storage-constant';
import { USER_ROLE_ENUM } from '@/model/enum';
export const setRemember = (username: string, password:string, role: USER_ROLE_ENUM) => {
  const data = {
    username,
    password,
    role
  } 
  localStorage.setItem(STORAGE_KEY.REMEMBER_ME, JSON.stringify(data));
}
export const getRememberData = () => {
  if(localStorage.getItem(STORAGE_KEY.REMEMBER_ME) && localStorage.getItem(STORAGE_KEY.REMEMBER_ME) !== null) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY.REMEMBER_ME) as string);
  }
}
export const deleteRemember= () => {
  localStorage.removeItem(STORAGE_KEY.REMEMBER_ME);
}