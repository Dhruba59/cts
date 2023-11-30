'use client';
import AddStudy from "@/features/study/add-study";
import { useParams } from "next/navigation";

export default function EditStudyPage() {
  const { id } = useParams();
  return (
  
       <AddStudy id={id as string} />
    
  );
}
