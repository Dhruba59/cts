'use client'
import AddIndication from "@/features/indication/add";
import AddTrainingMaterial from "@/features/taining-material/add";
import { useParams } from "next/navigation";
import React from "react";

export default function AddTrainingMaterialPage() {
  const { id } = useParams();
  return (
      <AddTrainingMaterial  id={id as string}/>
  );
}
