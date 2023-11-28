'use client';
import AddStudy from "@/features/study/add-study";
import { useParams } from "next/navigation";

export default function EditStudyPage() {
  const { id } = useParams();
  return (
    <div className="w-full px-8 flex justify-center items-center md:justify-start md:items-start">
       <AddStudy id={id as string} />
    </div>
  );
}
