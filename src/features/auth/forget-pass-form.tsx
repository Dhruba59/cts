"use client";
import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { forget_password } from "@/service/auth-service";
import Link from "next/link";
import { useState } from "react";

const ForgotPasswordForm = ( ) => {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const target = e.target as any; 
    try {
      setIsLoading(true);
      const res = await forget_password({ email: target[0].value });
      target[0].value = '';
      setIsRequestSent(true);
    } catch(err: any) {
      setIsRequestSent(false);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="border p-10 rounded-lg w-[450px] md:border-none md:p-0">
      <h2 className="mb-6">Forgot Password</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input label="Email" name="email"/>
        {isRequestSent ? (
          <Alert className="my-8">
            A reset link has been sent to the supplied email address. Follow
            instruction to reset password.
          </Alert>
        ) : (
          <Alert variant="warning" className="my-8">
            * This email should be the same once you used during user creation
            process
          </Alert>
        )}
        <Button type="submit" loading={isLoading}>
          {isRequestSent ? "Resend Request" : "Send"}
        </Button>
      </form>

      <div className="text-sm text-secondary flex items-center gap-8 mt-6">
        <Link href="/auth/login">Back to login</Link>
        <Link href="#">CTSdatabase Privacy Policy</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
