'use client'

import AddSponsor from "@/features/sponsor/add";
import { useParams } from "next/navigation";

export default function EditSponsorPage() {
  const { id } = useParams();
  return (
      <AddSponsor id={id as string}/>
  );
}
