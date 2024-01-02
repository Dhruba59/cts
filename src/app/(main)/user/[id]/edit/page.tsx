'use client'
import AddUser from "@/features/user/add";
import { useParams } from "next/navigation";

export default function EditIndicationPage() {
  const { id } = useParams();
  return (
      <AddUser id={id as string} />
  );
}
