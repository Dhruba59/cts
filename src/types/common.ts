import CriticalSetup from "@/features/study/add-study/critical-setup";
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
  wrapperClassName?: string;
};

export interface DndDataType {
  title: string;
  items: Array<DndDataItem>;
}

export interface DndDataItem {
  text: string;
  value: string;
}

export interface DndCustomComponentType {
  groupIndex: number;
  component: React.JSX.Element;
}

export interface TabElement {
  name: string;
  content: React.ReactNode;
}
