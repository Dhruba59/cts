'use client';
import { STORAGE_KEY } from "@/constants/storage-constant";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";

const AuthManager = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname(); 
  const { data, status }: any = useSession()

  useEffect(() => {
    if(status === 'authenticated' && data) {
      localStorage.setItem(STORAGE_KEY.AUTH_TOKEN, JSON.stringify(data?.user?.token));
      if(data?.user?.needToChangePassword) {
        router.push('/change-password');
      }
      else if(pathname.includes('auth')) {
        router.push('/dashboard');
      }
    }
    else if(status === 'unauthenticated' && !pathname.includes('auth')) {
      router.push('/auth/login');
    }
  });
  return children;
}

export default AuthManager;