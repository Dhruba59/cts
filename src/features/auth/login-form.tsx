"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import { RadioButton, RadioGroup } from "@/components/ui/radio";
import HelpModal from "@/features/auth/help-modal";
import {
  getRememberData,
  setRemember,
  setRoleIntoCookies,
  deleteRemember
} from "@/utils/session";
import { RememberMeData } from "@/model/login";
import { USER_ROLE_VALUE } from "@/constants/common";

const LoginForm = () => {
  const [role, setRole] = useState<number>(1);
  const [rememberMeData, setRememberMeData] = useState<RememberMeData>();
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getSetData = async () => {
      try {
        const rememberData = await getRememberData();
        if (rememberData) {
          const isRememberMe = rememberData ?? false;
          // @ts-ignore
          setIsRemember(isRememberMe);
          // @ts-ignore
          rememberData?.role && setRole(rememberData?.role);
          // @ts-ignore
          setRememberMeData(rememberData);
          //console.log(rememberData)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSetData();
  }, []);

  const router = useRouter();
  const onRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      username: e.target[0].value,
      password: e.target[1].value,
      role
    };
    setIsLoading(true);
    signIn("credentials", {
      ...payload,
      callbackUrl: "/dashboard",
      redirect: false
    }).then((res: any) => {
      if (res.ok) {
        if (isRemember) {
          setRemember(payload.username, payload.password, payload.role);
        } else {
          deleteRemember();
        }
        setRoleIntoCookies(payload.role.toString());
        toast.success("Successfully logged in!", { position: "top-center" });
      } else if (res.error) {
        toast.error(res.error, { position: "top-center" });
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="border p-10 rounded-2xl bg-white dark:bg-dark-lightBlue text-black dark:text-white/80 w-[450px] shadow-2xl">
      <h3 className="mb-6 mx-auto text-center">Welcome back</h3>
      <form className="space-y-6" onSubmit={onSubmit}>
        <Input label="Username" defaultValue={rememberMeData?.username} />
        <Input
          label="Password"
          type="password"
          defaultValue={rememberMeData?.password}
        />
        <RadioGroup
          name="user-type"
          label="User Type:"
          labelClassName="my-auto"
          selectedValue={rememberMeData?.role?.toString()}
          rootClassName="flex justify-between items-center"
          className="flex gap-5"
          onChange={onRoleChange}
        >
          <RadioButton
            id="site-user"
            value={USER_ROLE_VALUE.site_user.toString()}
            className="accent-primary"
            hoverClassName="hover:cursor-pointer"
          >
            Site User
          </RadioButton>
          <RadioButton
            id="sys-admin"
            value={USER_ROLE_VALUE.sys_admin.toString()}
            className="accent-primary"
            hoverClassName="hover:cursor-pointer"
          >
            Sys Admin
          </RadioButton>
          <RadioButton
            id="sponsor"
            value={USER_ROLE_VALUE.sponsor.toString()}
            className="accent-primary"
            hoverClassName="hover:cursor-pointer"
          >
            Sponsor
          </RadioButton>
        </RadioGroup>
        <div className="space-y-2">
          <Checkbox
            checked={isRemember}
            onChange={() => setIsRemember(!isRemember)}
            id="remember"
            className="accent-primary"
            rootClassName="flex items-center"
            labelClassName="text-xs italic"
          >
            Remember me
          </Checkbox>
          <Button
            size="large"
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>
        </div>
      </form>
      <div className="text-sm text-secondary flex justify-between items-center gap-8 mt-6">
        <Link href="/auth/forget-password">Forgot Password</Link>
        <Link href="#" onClick={() => setIsHelpModalOpen(true)}>
          Help
        </Link>
        <HelpModal open={isHelpModalOpen} setOpen={setIsHelpModalOpen} />
      </div>
    </div>
  );
};

export default LoginForm;
