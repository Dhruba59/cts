import { ERROR } from '@/constants/common';
import { login } from '@/service/auth-service';
import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(token: any) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Apikey: process.env.NEXT_PUBLIC_API_KEY,
      Authorization: `Bearer ${token.user.token.accessToken}`,
    },
  });

  try {
    const response = await instance.post("Auth/refresh", {
      refreshToken: token.user.token.refreshToken,
    });
    if (response.status != 200) {
      return {
        ...token,
        error: ERROR.REFRESH_ACCESS_TOKEN,
      };
    }
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
          const res = await login(credentials);
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
