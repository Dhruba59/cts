import LoginForm from "@/features/auth/login-form";
import Image from "next/image";
// import heroImage from '@/assets/image/heroImage.png';

const LoginPage = () => {
  return (
    <main className="h-fill flex pt-6 md:pt-0 overflow-hidden">
      <div className="hidden md:block md:w-2/5">
        <Image
          src="/hero-image-1416x1856.png"
          alt="hero-image"
          width={1416}
          height={1856}
          quality={100}
          className="w-full h-full object-cover" /* Use h-full to make it full height */
          priority
        />
      </div>
      <div className="w-full md:w-3/5 pt-0 px-8 bg-white dark:bg-dark-darkBlue flex items-center justify-center">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
