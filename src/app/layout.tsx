import "./globals.css";
import { MenuItemsContextProvider } from "@/context/menu-items-context";
import { ThemeContextProvider } from "@/context/theme-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthSessionProvider from "@/context/client-provider";
import ReactQueryClientProvider from "@/context/rqc-provider";

import 'dotenv/config';
import AuthManager from "@/components/auth/auth-manager";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider >
          <AuthSessionProvider session={session}>
            <AuthManager>
              <ThemeContextProvider>
                <MenuItemsContextProvider>
                  {children}
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
