
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "./query";

export interface Indication {
    indicationId: number;
    code: string | null;
    indicationName: string;
    codeType: string;
    description: string | null;
    active: boolean | null;
    isRequireDetails: boolean | null;
}

export interface CodeType {

  text: string;
  value: string;

}

export interface IndicationQuery extends  Query {
  code?: string;
  indicationName?: string;
  codeType?: string;
  description?: string;
  isRequireDetails?: boolean;
}


export const Indication_coluns: ColumnDef<IndicationQuery>[] = [
    {
      header: "Code",
      accessorKey: "code"
    },
    {
      header: "indication Name",
      accessorKey: "indicationName"
    },
    {
      header: "Code Type",
      accessorKey: "codeType"
    },
    // {
    //   header: "Description",
    //   accessorKey: "description"
    // },
    // {
    //   header: "Active",
    //   accessorKey: "active"
    // },
    // {
    //   header: "Require",
    //   accessorKey: "isRequireDetails"
    // }
  ];