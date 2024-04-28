"use client";
import { ERROR } from "@/constants/common";
import { USER_ROLE_ENUM } from "@/model/enum";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

const AuthManager = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status }: any = useSession();
  // @ts-ignore
  const isAdmin =
    data?.user?.currentRole?.roleId == USER_ROLE_ENUM.SYSTEM_ADMIN;

  useEffect(() => {
    const checkToken = () => {
      console.log(data);
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
            // router.push("/dashboard");
            if (isAdmin) {
              router.push("/change-request/dashboard");
            } else {
              router.push("/subject-management/enter-study-subject");
            }
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
