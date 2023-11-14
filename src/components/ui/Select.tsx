"use client";

import { customStyles } from "@/constants/selectStyle";
import { SelectProps } from "@/types/common";
import ReactSelect, { GroupBase } from "react-select";
import Label from "./label";

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { label, placeholder, wrapperClassName, ...restProps } = props;
  return (
    <div className={wrapperClassName}>
      {label && <Label label={label} className="inline-block mb-2" />}
      <div className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1">
        <ReactSelect
          styles={customStyles}
          id="long-value-select"
          instanceId="long-value-select"
          placeholder={placeholder ?? "Select"}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default Select;
