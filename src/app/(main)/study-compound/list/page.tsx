"use client";

import { useSearchParams } from "next/navigation";
import StudyCompoundList from "@/features/study-compound/list";


export default function StudyCompoundListPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <StudyCompoundList></StudyCompoundList>
  );
}
