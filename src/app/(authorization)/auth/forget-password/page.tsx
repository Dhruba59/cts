import ForgotPasswordForm from "@/features/auth/forget-pass-form";
import Image from "next/image";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <main className="flex h-fill pt-6 md:pt-0">
      <div className="hidden md:block md:w-2/5">
        <Image
          src="/hero-image-1416x1856.png"
          alt="heroImage"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-fill object-cover"
          priority
        />
      </div>
      <div className="w-full h-fill bg-white flex items-center justify-center">
        <ForgotPasswordForm />
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
