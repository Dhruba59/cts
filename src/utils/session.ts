import { STORAGE_KEY } from "@/constants/storage-constant";
import { USER_ROLE_ENUM } from "@/model/enum";
import { getCookie, hasCookie, setCookie, deleteCookie } from "cookies-next";
import * as CryptoJS from "crypto-js";
import { getApiKey } from "./server-functions";

export const addRememberData = async (
  username: string,
  password: string,
  role: USER_ROLE_ENUM
) => {
  const data = {
    username,
    password,
    role
  };

  //console.log(data);
  const apiKey = await getApiKey();
  // @ts-ignore
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    // @ts-ignore
    apiKey
  );
  //setCookie('test', 'test', { secure: true });
  setCookie(STORAGE_KEY.REMEMBER_ME, cipherText, { secure: true });
};
export const getRememberData = async () => {
  const apiKey = await getApiKey();
  const cookieData = getCookie(STORAGE_KEY.REMEMBER_ME);
  const isCookie = hasCookie(STORAGE_KEY.REMEMBER_ME);

  if (isCookie && cookieData) {
    // @ts-ignore
    const bytes = CryptoJS.AES.decrypt(
      cookieData,
      // @ts-ignore
      apiKey
    );
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    //console.log(plainText)
    return JSON.parse(plainText);
  }
};
export const deleteRemember = () => {
  deleteCookie(STORAGE_KEY.REMEMBER_ME);
};

export const setRoleIntoCookies = async (roleName: string) => {
  const apiKey = await getApiKey();
  // @ts-ignore
  const cipherText = CryptoJS.AES.encrypt(
    roleName,
    // @ts-ignore
    apiKey
  );
  setCookie(STORAGE_KEY.ROLE, cipherText, { secure: true });
};

export const getRoleFromCookies = async () => {
  const apiKey = await getApiKey();
  const cookieData = getCookie(STORAGE_KEY.ROLE);
  const isCookie = hasCookie(STORAGE_KEY.ROLE);

  if (isCookie && cookieData) {
    // @ts-ignore
    const bytes = CryptoJS.AES.decrypt(
      cookieData,
      // @ts-ignore
      apiKey
    );
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  }
};
