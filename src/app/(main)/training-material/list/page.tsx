"use client";
import { useSearchParams } from "next/navigation";
import TrainingMeterialList from "@/features/taining-meterial/list";

export default function IndicationPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <TrainingMeterialList></TrainingMeterialList>
  );
}
