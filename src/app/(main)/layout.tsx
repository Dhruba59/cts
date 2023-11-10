import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SidebarContextProvider } from "@/context/sidebar-context";
import Footer from "@/components/footer";
import AuthManager from "@/components/auth/auth-manager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthManager>
      <SidebarContextProvider>
        <main className="dark:text-white dark:bg-[#24303f]">
          <Header />
          <div className="flex">
            <Sidebar />
            {children}
          </div>
          <Footer />
        </main>
      </SidebarContextProvider>
    </AuthManager>
  );
}


