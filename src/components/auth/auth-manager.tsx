"use client";
import { ERROR } from "@/constants/common";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

const AuthManager = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status }: any = useSession();

  useEffect(() => {
    const checkToken = () => {
      if (data) {
        // old method to check token
        // const decodedToken = jwtDecode(data?.user?.token?.accessToken);
        // const isValidAccessToken = decodedToken?.exp ? Date.now() < decodedToken.exp * 1000 : false;
        // if (!isValidAccessToken) {
        //   router.push('/auth/login');
        //   return;
        // }

        if (data?.error === ERROR.REFRESH_ACCESS_TOKEN) {
          signOut({ callbackUrl: "/auth/login" });
        }

        if (status === "authenticated") {
          // if(!getAccessToken())
          //   localStorage.setItem(STORAGE_KEY.AUTH_TOKEN, JSON.stringify(data?.user?.token));
          if (data?.user?.needToChangePassword) {
            router.push("/change-password");
          } else if (pathname.includes("auth")) {
            router.push("/dashboard");
          }
        }
      } else if (status === "unauthenticated" && !pathname.includes("auth")) {
        router.push("/auth/login");
      }
    };
    checkToken();
  });

  return children;
};

export default AuthManager;
