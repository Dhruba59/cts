import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { RadioButton, RadioGroup } from "@/components/ui/radio";
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div className=" border p-10 rounded-2xl md:w-full lg:w-[450px]  shadow-2xl">
      <h3 className="mb-6 mx-auto text-center">Welcome back</h3>
      <form className="space-y-6">
        <Input label="Username" />
        <Input label="Password" type="password" />
        <RadioGroup
          name="user-type"
          label="User Type:"
          labelClassName="my-auto"
          selectedValue="sys-admin"
          rootClassName="flex justify-between items-center "
          className="flex gap-5"
        >          
          <RadioButton
            id="site-user"
            value="site-user"
            className="accent-primary"
          >
            Site User
          </RadioButton>
          <RadioButton
            id="sys-admin"
            value="sys-admin"
            className="accent-primary"
          >
            Sys Admin
          </RadioButton>
          <RadioButton id="sponsor" value="sponsor" className="accent-primary">
            Sponsor
          </RadioButton>
        </RadioGroup>
        <div className="space-y-2">
          <Checkbox id="remember" className="accent-primary" rootClassName="flex items-center" labelClassName="text-xs italic">
            Remember me
          </Checkbox>
          <Button size='large' className="w-full">Login</Button>
        </div>
        
      </form>
      <div className="text-sm text-secondary flex justify-between items-center gap-8 mt-6">
        <Link href="/forgot-password">Forgot Password</Link>
        <Link href="#">Help</Link>
      </div>
    </div>
  );
};

export default LoginForm;
