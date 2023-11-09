import { login } from '@/service/auth-service';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async signIn({ account, user }) {
      console.log('user', user);
      if (account?.provider === "credentials") return true;
      return false;
    },
    async jwt({ token, user }) {
      user && (token.user = user);
      console.log('jwt:::', token);
      return token;
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
        try {
          const res = await login(credentials);
          return res;
        } catch (err: any) {
          console.log('login error:::', err.message);
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
