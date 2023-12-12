"use client";
import { useSearchParams } from "next/navigation";
import TrainingMatarialList from "@/features/taining-material/list";

export default function TrainingMatarialListPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <TrainingMatarialList></TrainingMatarialList>
  );
}
