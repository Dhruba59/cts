"use client";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import { RadioButton, RadioGroup } from "@/components/ui/radio";
import { login } from "@/service/auth-service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEY } from "@/constants/storage-constant";
import { createNestedMenusItems } from "@/utils/helpers";
import { useMenuItemsContext } from "@/context/menu-items-context";
import HelpModal from "@/features/auth/help-modal";
import { getRememberData, setRemember } from "@/utils/session";
import { toast } from "react-toastify";
import Connector from "@/signalr-connection";

interface RememberMeData {
  username: string;
  password: string;
  role: number;
}

const LoginForm = () => {
  const [role, setRole] = useState<number>(1);
  const [rememberMeData, setRememberMeData] = useState<RememberMeData>();
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { items, setItems } = useMenuItemsContext();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const rememberData = getRememberData();
    if (rememberData) {
      const isRememberMe = rememberData ?? false;
      setIsRemember(isRememberMe);
      rememberData?.role && setRole(rememberData?.role);
      setRememberMeData(rememberData);
    }
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
    try {
      setIsLoading(true);
      const res = await login(payload);
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, res.token.accessToken);
      localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, res.token.refreshToken);
      isRemember &&
        setRemember(payload.username, payload.password, payload.role);
      setItems(createNestedMenusItems(res.screens));
      router.push("/dashboard");
    } catch (err: any) {
      console.log(err);
      toast.warn(err?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-10 rounded-2xl bg-white w-[450px] shadow-2xl">
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
          selectedValue={role.toString()}
          rootClassName="flex justify-between items-center"
          className="flex gap-5"
          onChange={onRoleChange}
        >
          <RadioButton id="site-user" value="1" className="accent-primary">
            Site User
          </RadioButton>
          <RadioButton id="sys-admin" value="4" className="accent-primary">
            Sys Admin
          </RadioButton>
          <RadioButton id="sponsor" value="3" className="accent-primary">
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
