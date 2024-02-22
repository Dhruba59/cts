import "./globals.css";
import { MenuItemsContextProvider } from "@/context/menu-items-context";
import { ThemeContextProvider } from "@/context/theme-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthSessionProvider from "@/context/client-provider";
import ReactQueryClientProvider from "@/context/rqc-provider";

import "dotenv/config";
import AuthManager from "@/components/auth/auth-manager";

import createHubConnection from "@/service/signalr-connection";
import { EnvConfigProvider } from "@/context/env-config-context";
// import { HubConnectionProvider } from "@/context/hub-connection-context";

import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "CTSdatabase",
  description: "Clinical Trial Database",
  manifest: "/manifest.json"
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const apiKey = `${process.env.API_KEY}`;
  const hubUrl = `${process.env.HUB_URL}`;

  return (
    <html lang="en">
      <body className="bg-[#F3F2F1] dark:bg-dark-darkBlue">
        <ReactQueryClientProvider>
          <AuthSessionProvider session={session}>
            <AuthManager>
              <ThemeContextProvider>
                <MenuItemsContextProvider>
                  {/* <HubConnectionProvider apiKey={apiKey} hubUrl={hubUrl}> */}
                    {children}
                  {/* </HubConnectionProvider> */}
                  <ToastContainer />
                </MenuItemsContextProvider>
              </ThemeContextProvider>
            </AuthManager>
          </AuthSessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
