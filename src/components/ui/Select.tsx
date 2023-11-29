"use client";

import { customStyles } from "@/constants/selectStyle";
import { SelectProps } from "@/types/common";
import ReactSelect, { GroupBase, GroupProps, OptionProps, Options } from "react-select";
import Label from "./label";
import { useEffect, useState } from "react";
import { SelectOptionType } from "@/model/drop-down-list";

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { label, placeholder, wrapperClassName, options = [], value, ...restProps } = props;
  const [selected, setSelected] = useState<SelectOptionType[]>([]);

  useEffect(() => {
    //@ts-ignore
    setSelected((prevSelected) => {
      //@ts-ignore
      if ((Array.isArray(value) && typeof value[0] === 'object') || (value?.label && value?.value)) {
        return value;
      } else if (Array.isArray(value)) {
        let tempValue = value.map(val => val.toString());
        return options.filter((option: any) => tempValue.includes(option.value));
      } else if (!Array.isArray(value)) {
        console.log(value, options);
        return options.filter((option: any) => option.value === value?.toString())
      }
    })
  }, [value]);

  return (
    <div className={wrapperClassName}>
      {label && <Label label={label} className="inline-block mb-2" />}
      <div className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1">
        <ReactSelect
          styles={customStyles}
          id="long-value-select"
          instanceId="long-value-select"
          placeholder={placeholder ?? "Select"}
          options={options}
          value={selected as any}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default Select;
