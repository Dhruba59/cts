"use client";

import { useSearchParams } from "next/navigation";
import NationalIdTypeList from "@/features/indication/list";


export default function NationalIdTypeListPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <NationalIdTypeList></NationalIdTypeList>
  );
}
