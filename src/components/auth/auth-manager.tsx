'use client';
import { STORAGE_KEY } from "@/constants/storage-constant";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const AuthManager = ({ children }: any) => {
  const router = useRouter();
  const { data, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/login');
    },
  })

  useEffect(() => {
    if(status === 'authenticated' && data) {
      localStorage.setItem(STORAGE_KEY.AUTH_TOKEN, JSON.stringify(data?.user?.token));
      if(data?.user?.needToChangePassword) {
        router.push('change-password');
      }
    }
  },[]);
  return children;
}

export default AuthManager;