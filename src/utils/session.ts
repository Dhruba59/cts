import { STORAGE_KEY } from '@/constants/storage-constant';
import { USER_ROLE_ENUM } from '@/model/enum';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

export const setRemember = (username: string, password:string, role: USER_ROLE_ENUM) => {
  const data = {
    username,
    password,
    role
  } 
  // localStorage.setItem(STORAGE_KEY.REMEMBER_ME, JSON.stringify(data));
  setCookie(STORAGE_KEY.REMEMBER_ME, JSON.stringify(data));
}
export const getRememberData = () => {
  // const cookieData = cookies().get(STORAGE_KEY.REMEMBER_ME);
  const cookieData = getCookie(STORAGE_KEY.REMEMBER_ME);
  const isCookie = hasCookie(STORAGE_KEY.REMEMBER_ME);

  if(isCookie && cookieData) {
    return JSON.parse(cookieData);
  }
  // if(localStorage.getItem(STORAGE_KEY.REMEMBER_ME) && localStorage.getItem(STORAGE_KEY.REMEMBER_ME) !== null) {
  //   return JSON.parse(localStorage.getItem(STORAGE_KEY.REMEMBER_ME) as string);
  // }
}
export const deleteRemember= () => {
  localStorage.removeItem(STORAGE_KEY.REMEMBER_ME);
}