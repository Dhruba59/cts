
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "./query";

export interface Indication {
    indicationId?: number;
    code?: string;
    indicationName?: string;
    codeType?: string;
    description?: string;
    active?: boolean | null;
    isRequireDetails?: boolean;
}

export interface CodeType {

  text: string;
  value: string;

}

export interface IndicationQuery extends Indication,  Query {

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
  ];


  export interface getIndicationListProps {
    searchField: string;
    searchValue: string;
  }