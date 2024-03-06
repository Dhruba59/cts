'use client'
import { MainContainer } from "@/components/style-container";
import HelpModal from "@/features/auth/help-modal";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useState } from "react";

export default function SupporHelp() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('* This email should be the same one you used during the user creation process.');

  return (
    <main>
    <section className="border rounded-lg h-full mx-2 my-4 lg:my-6">
      <div className="m-1 sm:m-2 lg:m-4">
        <h5 className="my-4">Do you need any help?</h5>
        <div className="flex flex-col w-full lg:flex-row gap-4 justify-between items-center">
          <div
            className="w-full px-8 py-3.5 text-center bg-white dark:bg-dark-lightBlue border-2 text-primary border-orange-400 rounded-sm leading-tight"
          >
            <p>If you need any help regarding our services, please contact our Customer Service team at any time. They will attempt to resolve your concerns fairly and in a timely manner.</p>
          </div>
          <button
            className="px-8 py-3.5 w-full sm:max-w-[200px] lg:max-w-[100px] h-auto text-center border-2 text-white border-blue-500 bg-blue-500 shadow-blue-500/50 shadow-inner rounded-sm leading-tight"
            type="button"
            onClick={() => setIsHelpModalOpen(true)}
          >
            Help
          </button>
        </div>
      </div>
      <HelpModal open={isHelpModalOpen} setOpen={setIsHelpModalOpen} />
    </section>
  </main>
  

  );
}