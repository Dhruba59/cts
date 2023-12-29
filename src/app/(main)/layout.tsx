import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SidebarContextProvider, useSidebarContext } from "@/context/sidebar-context";
import Footer from "@/components/footer";
import AuthManager from "@/components/auth/auth-manager";
import MainBody from "@/components/main/main-body";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarContextProvider>
      <main className="h-screen dark:text-white dark:bg-[#24303f]">
        <Header />
        <div className="flex h-auto max-md:">
          <Sidebar />
          <MainBody>{children}</MainBody>
        </div>
        <Footer />
      </main>
    </SidebarContextProvider>
  );
}
