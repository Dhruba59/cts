import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { Controller } from "react-hook-form";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" }
];

export function SearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { control } = form;

  return (
    <div className="col-span-2 flex gap-2 items-center">
        <Label label="Inactive Month >= " className="hidden lg:block" />
        <div className="w-full md:w-52">
          <Controller
            control={control}
            name="inactiveMonth"
            render={({ field: { onChange, onBlur, value } }: any) =>
              <Select onChange={onChange} options={options} value={value} placeholder="Select Inactive Month" isClearable/>}
          />
        </div>
    </div>
  );
}
