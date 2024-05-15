import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Input from "./input";
import Select from "./select";
import { SelectOptionType } from "@/model/drop-down-list";
import { SingleValue } from "react-select";
import Label from "./label";
import dayjs from "dayjs";

const monthOptions: SelectOptionType[] = [
  { label: "Jan", value: "Jan" },
  { label: "Feb", value: "Feb" },
  { label: "Mar", value: "Mar" },
  { label: "Apr", value: "Apr" },
  { label: "May", value: "May" },
  { label: "Jun", value: "Jun" },
  { label: "Jul", value: "Jul" },
  { label: "Aug", value: "Aug" },
  { label: "Sep", value: "Sep" },
  { label: "Aug", value: "Aug" },
  { label: "Nov", value: "Nov" },
  { label: "Dec", value: "Dec" }
];

const getMonthFromDate = (date: string | undefined) => {
  const monthNo = dayjs(date).month();
  return monthOptions[monthNo];
};

interface CustomDatePickerValueType {
  day: string;
  month: SelectOptionType;
  year: string;
}

interface CustomDatePickerProps {
  id?: string | undefined
  onChange: (date: string | undefined) => void;
  label?: string;
  customLevel: ReactNode;
  wrapperClassName?: string;
  value?: string | undefined;
}

const CustomDatepicker = ({
  value,
  label,
  onChange,
  customLevel,
  wrapperClassName
}: CustomDatePickerProps) => {
  //console.log(value);
  const [day, setDay] = useState<string | undefined>(
    value && dayjs(value)?.day()?.toString()
  );
  const [year, setYear] = useState<string | undefined>(
    value && dayjs(value)?.year()?.toString()
  );
  const [month, setMonth] = useState<SelectOptionType | undefined>(
    value ? getMonthFromDate(value) : undefined
  );

  const handleSelect = (option: SingleValue<SelectOptionType>) => {
    setMonth(option ?? undefined);
    // handleOnChange();
  };

  useEffect(() => {
    setDay(dayjs(value).day().toString());
    setMonth(getMonthFromDate(value));
    setYear(dayjs(value).year().toString());
  }, [value]);

  const handleOnChange = () => {
    if (!day || !month?.value || !year) {
      return;
    } else {
      onChange(`${day}-${month?.value}-${year}`);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const value = e.target.value;

    if (inputName === "day") {
      if ((parseInt(value) >= 0 && parseInt(value) <= 31) || value === "") {
        setDay(value);
      }
    } else if (inputName === "year") {
      if (value.length <= 4) {
        setYear(value);
      }
    }

    // handleOnChange();
  };

  // useEffect(() => {
  //   if (!day || !month?.value || !year) {
  //     onChange(undefined);
  //   } else {
  //     onChange(`${day}-${month?.value}-${year}`);
  //   }
  // }, [month, day, year]);
  // @ts-ignore
  //console.log('update value date', dayjs(value), dayjs(value).year());

  return (
    <div className={wrapperClassName}>
      {label && <Label label={label} className="inline-block mb-2" />}
      {customLevel}
      <div className="flex gap-1">
        <Input
          name="day"
          className="w-10 px-2"
          value={day}
          placeholder="DD"
          onChange={handleInput}
          onBlur={handleOnChange}
          type="number"
        />
        <Select
          placeholder="MMM"
          className="w-24 px-0 mx-0"
          value={month}
          options={monthOptions}
          onBlur={handleOnChange}
          onChange={handleSelect}
        />
        <Input
          name="year"
          className="px-2 w-14"
          placeholder="YYYY"
          value={year}
          onChange={handleInput}
          onBlur={handleOnChange}
          type="number"
          min={1800}
        />
      </div>
    </div>
  );
};

export default CustomDatepicker;
