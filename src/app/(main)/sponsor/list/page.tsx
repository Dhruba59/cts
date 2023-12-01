"use client";

import { useEffect, useState } from "react";
import SponsorList from "@/features/sponsor/list";
import { useSearchParams } from "next/navigation";


export default function SponsorListPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <SponsorList></SponsorList>
  );
}
