import "./globals.css";
import { MenuItemsContextProvider } from "@/context/menu-items-context";
import { ThemeContextProvider } from "@/context/theme-context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='dark:text-white dark:bg-neutral-800'>
        <ThemeContextProvider>
          <MenuItemsContextProvider>
            {children}
            <ToastContainer />
          </MenuItemsContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
