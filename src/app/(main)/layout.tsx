import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SidebarContextProvider } from "@/context/sidebar-context";
import Footer from "@/components/footer";
import AuthManager from "@/components/auth/auth-manager";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarContextProvider>
      <main className="h-screen dark:text-white dark:bg-[#24303f]">
        <Header />
        <div className="flex h-auto">
          <Sidebar />
          <div className="w-full px-4 md:px-6 mt-16 mb-12 overflow-hidden">{children}</div>
        </div>
        <Footer />
      </main>
    </SidebarContextProvider>
  );
}
