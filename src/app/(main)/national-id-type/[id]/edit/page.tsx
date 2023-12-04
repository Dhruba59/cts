'use client'

import { MainContainer } from "@/components/style-container";
import AddNationalIdType from "@/features/national-id-type/add";
import { useParams } from "next/navigation";

export default function EditNationalIdTypePage() {
  const { id } = useParams();
  return (
      <AddNationalIdType id={id as string}/>
  );
}
