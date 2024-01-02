"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import SimpleTable from "@/components/table/simpleTable";

import { useEffect, useState } from "react";
import { getIndications } from "@/service/indication-service";
import {
  Indication,
  IndicationQuery,
  Indication_coluns
} from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import AddIndication from "@/features/indication/add";
import IndicationList from "@/features/indication/list";

export default function IndicationPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
      <IndicationList></IndicationList>
  );
}
