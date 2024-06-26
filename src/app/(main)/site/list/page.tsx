"use client";

import { useSearchParams } from "next/navigation";
import SiteList from "@/features/site/list";


export default function SiteListPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <SiteList></SiteList>
  );
}
