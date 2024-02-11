"use client";

import { useSearchParams } from "next/navigation";
import ChangeRequestReprintList from "@/features/change-request/reprint";
import { Suspense } from "react";
import Loading from "@/components/loader";

export default function IndicationPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
   <ChangeRequestReprintList></ChangeRequestReprintList>   
  );
}
