"use client";
import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { forget_password } from "@/service/auth-service";


const ForgotPasswordForm = () => {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertText, setAlertText] = useState<string>('* This email should be the same one you used during the user creation process.');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (value) => {
    setIsLoading(true);
    const { data, error }: any = await forget_password({ email: value.email });
    if (data) {
      setIsRequestSent(true);
      reset();
      setAlertText(data?.message + ' ' + data?.details);
    } else if (error) {
      setIsRequestSent(false);
      setAlertText(error.detail);
    }
    setIsLoading(false);
  };

  return (
    <div className="border p-10 rounded-lg w-[450px] md:border-none md:p-0">
      <h2 className="mb-6">Forgot Password</h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format"
            }
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message as string}</span>
        )}
        <Alert variant={isRequestSent ? 'success' : 'warning'} className="my-8">
          {alertText}
        </Alert>
        <Button type="submit" loading={isLoading}>
          {isRequestSent ? "Resend Request" : "Send"}
        </Button>
      </form>

      <div className="text-sm text-secondary flex items-center gap-8 mt-6">
        <Link href="/auth/login">Back to login</Link>
        <Link href="https://ctsdatabase.com/privacy" target="_blank">
          CTSdatabase Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
