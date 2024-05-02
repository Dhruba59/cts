import axios, { AxiosRequestConfig } from "axios";
import { setTokens } from "@/utils/helpers";
import { STORAGE_KEY } from "@/constants/storage-constant";
import { getSession, signOut } from "next-auth/react";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { Apikey: process.env.NEXT_PUBLIC_API_KEY },
});

instance.interceptors.request.use(async (request) => {

  //const accessToken = getCookie("accessToken");
  //console.log(accessToken);
  
  const session = await getSession();
  //@ts-ignore
  const accessToken = session?.user?.token?.accessToken;
  //console.log(accessToken);

  if (typeof window !== "undefined") {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return request;
});

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Call your API to refresh the token
//         const { data: session, update } = useSession();
//         //@ts-ignore
//         const refreshToken = session?.user?.token?.refreshToken;
//         const refreshedSession = await instance.post("/auth/refresh", {
//           refreshToken: refreshToken,
//         });
//         // Update Next-Auth session and request header
//         update({
//           ...session,
//           user: {
//             ...session?.user,
//             token: refreshedSession?.data
//           }
//         })
//         // setTokens(refreshedSession.data);
//         // replace header token with new token
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${refreshedSession.data.accessToken}`;
//         return instance(originalRequest);
//       } catch (refreshError) {
//         // remove old token if refresh token failed
//         localStorage.removeItem(STORAGE_KEY.AUTH_TOKEN);
//         await signOut({ callbackUrl: "/auth/login" });

//         // reject with failed refresh token error
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const request = async ({ ...options }: AxiosRequestConfig) => {
  return instance(options);
};
