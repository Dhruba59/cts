import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { BookIcon, GlobalEditIcon, IndicationIcon, MagicStarIcon, PersonalCardIcon, SettingsIcon } from "@/assets/icons";
import Sidebar from "@/components/sidebar";
import { SidebarContextProvider } from "@/context/sidebar-context";

export const metadata: Metadata = {
  title: "CTS Database",
  description: "Generated by create next app",
};

const items: any = [
  {
    icon: <IndicationIcon className="h-full" />,
    text: 'Indication',
    subitems: [
      {
        icon: null,
        text: 'Add Indication',
      },
      {
        icon: null,
        text: 'List of Indication',
      },
    ],
  },
  {
    icon: <MagicStarIcon />,
    text: 'Sponsor Information',
  },
  {
    icon: <GlobalEditIcon />,
    text: 'Site Information',
  },
  {
    icon: <BookIcon />,
    text: 'Study Information',
    subitems: [
      {
        icon: null,
        text: 'Study Study',
      },
      {
        icon: null,
        text: 'List of Indication',
      },
    ],
  },
  {
    icon: <PersonalCardIcon />,
    text: 'National Id Type',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='dark:text-white dark:bg-neutral-800'>
        <SidebarContextProvider>
          <Header />
          <div className='flex'>
            <Sidebar items={items} />
            {children}
          </div>
        </SidebarContextProvider>
      </body>
    </html>
  );
}
