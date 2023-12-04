"use client";

import { useSearchParams } from "next/navigation";
import NationalIdTypeList from "@/features/national-id-type/list";


export default function NationalIdTypeListPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <NationalIdTypeList></NationalIdTypeList>
  );
}
