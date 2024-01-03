'use client'

import AddIndication from "@/features/indication/add";
import { useParams } from "next/navigation";

export default function EditIndicationPage() {
  const { id } = useParams();
  return (
      <AddIndication id={id as string}/>
  );
}
