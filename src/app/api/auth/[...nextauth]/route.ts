import { ERROR } from '@/constants/common';
import { login } from '@/service/auth-service';

import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers'

export async function getAccessToken(credentials:any){
  const res = await login(credentials);

  // add token to cookies
  cookies().set('accessToken', res.data.token.accessToken, { secure: true });
  cookies().set('refreshToken', res.data.token.refreshToken, { secure: true });
  
  // remove token from cookies
  delete res.data.token.accessToken;
  delete res.data.token.refreshToken;

  //console.log(res)
  return res;
}
async function refreshAccessToken(token: any) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')  
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Apikey: process.env.NEXT_PUBLIC_API_KEY,
      //Authorization: `Bearer ${token.user.token.accessToken}`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    
    const refreshToken = cookieStore.get('refreshToken')  
    const response = await instance.post("Auth/refresh", {
      //refreshToken: token.user.token.refreshToken,
      refreshToken: refreshToken
    });
    if (response.status != 200) {
      return {
        ...token,
        error: ERROR.REFRESH_ACCESS_TOKEN,
      };
    }

    cookies().set('accessToken', response.data.accessToken, { secure: true });
    cookies().set('refreshToken', response.data.refreshToken, { secure: true });
    
    // remove token from cookies
    delete response.data.accessToken;
    delete response.data.refreshToken;

    token.user.token = {
      ...response?.data,
      accessTokenExpires:
        Date.now() + response?.data?.accessTokenExpiresInSeconds * 1000,
    };
    return token;
  } catch (error: any) {
    return {
      ...token,
      error: ERROR.REFRESH_ACCESS_TOKEN,
    };
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "credentials") return true;
      return false;
    },
    async jwt({ token, user, account, trigger, session }: any) {
      // Initial sign in
      if (user) {
        token.user = user;
        token.user.token.accessTokenExpires =
          Date.now() + user.token.accessTokenExpiresInSeconds * 1000;
      }

      if (trigger === "update") {
        token.user = { ...session.user };
      }

      if (Date.now() < token.user.token.accessTokenExpires) {
        return token;
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }: any) {
      return token as any;
    },
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "number" },
      },
      async authorize(credentials: any) {
        try {
          const res = await getAccessToken(credentials);
          return res?.data;
        } catch (error: any) {
          throw new Error(error?.response?.data?.detail);
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
