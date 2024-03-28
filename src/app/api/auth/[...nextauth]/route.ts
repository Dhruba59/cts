import { login, refreshToken } from '@/service/auth-service';
import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signOut } from 'next-auth/react';

async function refreshAccessToken(token: any) {
    console.log('refreshing token', token);
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: { 
        Apikey: process.env.NEXT_PUBLIC_API_KEY,
        Authorization: `Bearer ${token.user.token.accessToken}`
      },
    });

    try {
      const response = await instance.post('Auth/refresh', { refreshToken: token.user.token.refreshToken});
      console.log('post response', response);
      token.user.token = {
        ...response?.data,
        accessTokenExpires: Date.now() + response?.data?.accessTokenExpiresInSeconds * 1000,
      }
      console.log('new token', token);
      return token;
    } catch (error: any) {
      console.log(error);
      signOut({ callbackUrl: "/auth/login" });
    }

    // instance.post('Auth/refresh', { refreshToken: token.user.token.refreshToken}).then((response: any) => {
    //   console.log('post response', response);
    //   token.user.token = {
    //     ...token.user.token,
    //     accessToken: response?.data?.accessToken,
    //     accessTokenExpires: Date.now() + response?.data?.accessTokenExpiresInSeconds * 1000,
    //     refreshToken: response?.data?.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    //   }
    //   console.log('new token', token);
    //   return token;
    // }).catch((error: any) => {
    //   console.log(error);
    //   signOut({ callbackUrl: "/auth/login" });
    // });
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
        //@ts-ignore
        token.user.token.accessTokenExpires = Date.now() + user.token.accessTokenExpiresInSeconds * 1000;
      }

      if (trigger === 'update') {
        token.user = {...session.user};     
      }
      // user && (token.user = user);

      console.log('user', user);
      console.log('----------------------------');
      console.log('token', token);
      console.log('----------------------------');
      console.log('session', session);

      //@ts-ignore
      if (Date.now() <  token.user.token.accessTokenExpires) {
        return token
      }
      //@ts-ignore
      const newToken =  await refreshAccessToken(token);
      console.log('newToken in jwt', newToken)
      return newToken;
    },
    async session({ session, token }: any) {
      return token as any;
    }
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
        try{
          const res = await login(credentials);
          return res?.data;
        } catch(error: any) {
          throw new Error(error?.response?.data?.detail);
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
