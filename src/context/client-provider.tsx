'use client';

import { AuthSessionProviderProps } from "@/model/provider";
import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider ({ children, session }: AuthSessionProviderProps) {
  return <SessionProvider session={session}>
    {children}
  </SessionProvider>
}