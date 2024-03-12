
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "./query";
import { SelectOptionType } from "./drop-down-list";
import { BasicTabSearchBarContentsProps } from "./common";
import { UseFormReturn } from "react-hook-form";

export interface Indication {
    indicationId?: number;
    code?: string | null;
    indicationName?: string | null;
    codeType?: string | null;
    description?: string | null;
    active?: boolean | null;
    isRequireDetails?: boolean | null;
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

  export interface IndicationTabSearchBarContentProps extends BasicTabSearchBarContentsProps{
    codeTypeOptions: SelectOptionType[];
  }
  
  export interface SearchFormProps extends BasicTabSearchBarContentsProps{
    codeTypeDropDown: any;
  }