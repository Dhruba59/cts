import { STORAGE_KEY } from '@/constants/storage-constant';
import { USER_ROLE_ENUM } from '@/model/enum';
import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';
import * as CryptoJS from 'crypto-js'

export const setRemember = (username: string, password:string, role: USER_ROLE_ENUM) => {
  const data = {
    username,
    password,
    role
  } 
    // @ts-ignore
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.NEXT_PUBLIC_API_KEY);
    setCookie(STORAGE_KEY.REMEMBER_ME, cipherText,{secure: true});
}
export const getRememberData = () => {
  // const cookieData = cookies().get(STORAGE_KEY.REMEMBER_ME);
  const cookieData = getCookie(STORAGE_KEY.REMEMBER_ME);
  const isCookie = hasCookie(STORAGE_KEY.REMEMBER_ME);

  if(isCookie && cookieData) {
    // @ts-ignore
    const bytes = CryptoJS.AES.decrypt(cookieData, process.env.NEXT_PUBLIC_API_KEY);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return  JSON.parse(plainText);
  }
  // if(localStorage.getItem(STORAGE_KEY.REMEMBER_ME) && localStorage.getItem(STORAGE_KEY.REMEMBER_ME) !== null) {
  //   return JSON.parse(localStorage.getItem(STORAGE_KEY.REMEMBER_ME) as string);
  // }
}
export const deleteRemember= () => {
  //localStorage.removeItem(STORAGE_KEY.REMEMBER_ME);
  deleteCookie(STORAGE_KEY.REMEMBER_ME);
}

export const setRoleIntoCookies = (roleName: string) => {
  // @ts-ignore
  const cipherText = CryptoJS.AES.encrypt(roleName, process.env.NEXT_PUBLIC_API_KEY);
  setCookie(STORAGE_KEY.ROLE, cipherText,{secure: true});
}

export const getRoleFromCookies = () => {
  const cookieData = getCookie(STORAGE_KEY.ROLE);
  const isCookie = hasCookie(STORAGE_KEY.ROLE);

  if(isCookie && cookieData) {
    // @ts-ignore
    const bytes = CryptoJS.AES.decrypt(cookieData, process.env.NEXT_PUBLIC_API_KEY);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  }
}