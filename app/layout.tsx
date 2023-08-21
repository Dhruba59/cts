"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

import MenuContextProvider from "@/context/MenuContext";
import Providers from "@/context/Provider";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
   
    setTimeout(() => setLoading(false), 1000);
    setWindowSize(screen.width);
    if(windowSize >= 1024){
      setSidebarOpen(true)
    }
    
  }, [windowSize]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      <MenuContextProvider>
        <Providers>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar
                  windowSize={windowSize}
                  setWindowSize={setWindowSize}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  {/* <!-- ===== Header Start ===== --> */}
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  {/* <!-- ===== Header End ===== --> */}

                  {/* <!-- ===== Main Content Start ===== --> */}
                  <main>
                    <div className="mx-auto max-w-screen-2xl p-2 md:p-3 2xl:p-4">
                      {children}
                    </div>
                  </main>
                  {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
              </div>
            )}
          </div>
        </Providers>
       </MenuContextProvider>
      </body>
    </html>
  );
}
