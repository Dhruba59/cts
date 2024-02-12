"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useSearchParams } from "next/navigation";
import ChangeRequestAuditList from "@/features/change-request/audit";

export default function ChangeRequestAuditPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
     <ChangeRequestAuditList></ChangeRequestAuditList>
  );
}
