"use client";

import { useSearchParams } from "next/navigation";
import ChangeRequestReprintList from "@/features/change-request/reprint";

export default function IndicationPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
   <ChangeRequestReprintList></ChangeRequestReprintList>   
  );
}
