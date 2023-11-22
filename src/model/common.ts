import { ColumnDef, SortingState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { GroupBase, Props } from "react-select";

export interface KeyValueType {
  [key: string | number]: string | number;
}

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group> & {
  label?: string;
};

export interface InputRangeDataType {
  minValue: number;
  maxValue: number;
}

export interface DataTableProps<TData, TValue>
  extends React.ComponentPropsWithoutRef<"div"> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>
}

