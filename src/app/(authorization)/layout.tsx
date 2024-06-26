import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/auth/header";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "CTS Database",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Header />
      <div className="text-black bg-white">{children}</div>
      <Footer />
    </Fragment>
  );
}
