import "./globals.css";
import { MenuItemsContextProvider } from "@/context/menu-items-context";
import { ThemeContextProvider } from "@/context/theme-context";

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
          </MenuItemsContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
