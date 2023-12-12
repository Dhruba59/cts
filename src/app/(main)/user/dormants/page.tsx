"use client";

import DormantUserList from "@/features/user/dormants";
import { useSearchParams } from "next/navigation";


export default function IndicationPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <DormantUserList></DormantUserList>
  );
}
