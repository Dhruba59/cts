"use client";
import { useSearchParams } from "next/navigation";

import ChangeRequestDashboardList from "@/features/change-request/dashboard";

export default function IndicationPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <ChangeRequestDashboardList></ChangeRequestDashboardList>
  );
}
