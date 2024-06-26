import { ColumnDef, SortingState } from "@tanstack/react-table";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
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
  data: any;
  totalPages?: number;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>
  isLoading?: boolean;
  containerClassName?: string;
}


export interface TabSearchBarProps {
  /*
    wrap each input field or elements using Fragment to get the default styles
  */
  formContent: ReactNode;
  onReset: () => void;
}

export interface BasicTabSearchBarContentsProps {
  form: UseFormReturn;
}