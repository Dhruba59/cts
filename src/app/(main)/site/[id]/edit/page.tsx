'use client'

import AddSite from "@/features/site/add";
import { useParams } from "next/navigation";

export default function EditSitePage() {
  const { id } = useParams();
  return (
      <AddSite id={id as string}/>
  );
}
