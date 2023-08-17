"use client";
import React, { useState, useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const MainContent = ({ children }) => {
  const { open } = useContext(MenuContext);
  return (
    <div className={`${open ? "w-[84vw]" : "w-[96vw]"} flex flex-col`}>
      <header className="flex sticky h-[10vh] top-0  bg-red-500">
        <Header />
      </header>
      <main className={`flex h-[85vh] p-2 pr-3 pb-0 overflow-x-scroll`}>
        {children}
      </main>
      <footer className=" flex justify-center items-center h-[5vh] bg-red-500 sticky bottom-0">
        <Footer />
      </footer>
    </div>
  );
};

export default MainContent;
