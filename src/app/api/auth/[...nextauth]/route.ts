import { login, refreshToken } from '@/service/auth-service';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signOut } from 'next-auth/react';

async function refreshAccessToken(token: any) {
  try {
    const response = await refreshToken({
      refreshToken: token.refreshToken
    });

    token.user.token = {
      ...token.user.token,
      accessToken: response?.data?.token?.accessToken,
      accessTokenExpires: Date.now() + response?.data?.token?.accessTokenExpiresInSeconds * 1000,
      refreshToken: response?.data?.token?.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    }
    return token;

  } catch (error) {
    console.log(error)
    await signOut({ callbackUrl: "/auth/login" });
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
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (account && user) {
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
      return refreshAccessToken(token.user.token)
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
