'use client';

import { AuthSessionProviderProps } from "@/model/provider";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AuthSessionProvider ({ children, session }: AuthSessionProviderProps) {
  const [interval, setInterval] = useState(0);
  
  return <SessionProvider session={session} refetchInterval={interval}>
    {children}
    <RefreshTokenHandler setInterval={setInterval} />
  </SessionProvider>
}


const RefreshTokenHandler = ({ setInterval }: any) => {
  const { data: session } = useSession();

  useEffect(() => {
    if(!!session) {
      //@ts-ignore
      const expiryDate = new Date(session?.user?.token?.accessTokenExpires);
      const differenceInMilliseconds = expiryDate.getTime() -  Date.now();
      const remainingSeconds = Math.round(differenceInMilliseconds / 1000);
      setInterval(remainingSeconds > 0 ? remainingSeconds : 1);
    }
}, [session, setInterval]);

  return null;
}