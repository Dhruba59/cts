'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const AuthManager = ({ children }: any) => {
  
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/login');
    }
  })

  return children;
}

export default AuthManager;