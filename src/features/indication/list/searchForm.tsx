import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { CodeType } from "@/model/indication";
import { get_indication_code_types } from "@/service/indication-service";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const SearchForm = () => {

  const [codeTypes, setCodeTypes] = useState<SelectOptionType[]>([]);

  const convertTypeToSelectOption = (data: DropDownItem[]): SelectOptionType[] => (
    data?.map((item: DropDownItem) => ({
      label: item.text,
      value: item.value,
    }))
  );
  const fetchData = async () => {
    const { data, error }: any = await get_indication_code_types();
    console.log(data);
    setCodeTypes(convertTypeToSelectOption(data.codeTypes));
    console.log(codeTypes);
  };

  useEffect(() => {
    fetchData();
  },[])

  const onChange = () => {};
  return (
    <form className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Indication Code: " className="hidden lg:block" />
        <Input placeholder="Enter indication code" className="md:w-48" />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1">
        <Label label="Code Type: " className="hidden lg:block" />
        <Select onChange={onChange} label=" " options={codeTypes}  className="md:w-48"/>
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Indication Name: " className="hidden lg:block" />
        <Input placeholder="Enter indication name" className="md:w-48" />
      </div>
      <div className="flex flex-col gap-2 justify-center ml-2 items-start">
        <Label label="Active" className="inline-block mb-2" />
        <Checkbox className="-mt-2" onChange={onChange} />
      </div>

      {/* <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Indication Name: " className="hidden lg:block" />
        <Textarea placeholder="Enter indication name" className="md:w-48"/>
      </div> */}
     
      <Button className="!h-10 mb-[1px]">Search</Button>
    </form>
  );
};

export default SearchForm;
