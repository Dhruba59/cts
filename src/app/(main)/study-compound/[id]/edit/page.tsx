'use client'

import AddStudyCompound from "@/features/study-compound/add";
import { useParams } from "next/navigation";

export default function EditStudyCompoundPage() {
  const { id } = useParams();
  return (
      <AddStudyCompound id={id as string}/>
  );
}
