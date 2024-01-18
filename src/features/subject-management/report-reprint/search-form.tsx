import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { SelectOptionType } from "@/model/drop-down-list";
import { getAssignedProtocols, getProtocolsByStudyId } from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { getProtocolsDropdown } from "@/utils/subject";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useQuery } from "react-query";

interface SearchFormProps {
  isAdvancedOpen: boolean;
  form: UseFormReturn;
}

const SearchForm = ({ isAdvancedOpen, form }: SearchFormProps) => {
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>([]);
  const { register, control } = form;

  const { data: protocolList } = useQuery({
    queryFn: getAssignedProtocols,
  });

  useEffect(() => {
    setProtocolOptions(convertTypeToSelectOption(protocolList?.data));
  }, [protocolList])


  return (
    <div className="flex items-end gap-3 md:gap-6 py-4 md:py-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden lg:block" />
        <Controller
          control={control}
          name='protocol'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select className="xl:w-48" onChange={onChange} value={value} options={protocolOptions} />
          )}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1">
        <Label label="Subject ID: " className="hidden lg:block" />
        <Input placeholder="Enter subject id" className="xl:w-48" {...register('subjectId')} />
      </div>
      <Button className={`mb-[1px] w-fit ${isAdvancedOpen ? 'hidden' : 'block'}`} type="submit">Search</Button>
    </div>
  );
};

const AdvanceSearchForm = ({ form }: Omit<SearchFormProps, 'isAdvancedOpen'>) => {
  const { register, control, reset } = form;
  return (
    <div className="hidden lg:block p-6 space-y-6">
      <div className="grid grid-col-1 md:grid-cols-3 gap-x-16">
        <Controller
          control={control}
          name='fromDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection='down'
              value={value}
              asSingle
              useRange={false}
              onChange={onChange}
              placeholder="From Date"
              label="Date of Birth"
            />
          )}
        />
        <Controller
          control={control}
          name='toDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              popoverDirection='down'
              value={value}
              asSingle
              useRange={false}
              onChange={onChange}
              placeholder="To Date"
              label="Date of Birth"
            />
          )}
        />
      </div>
      <div className="flex items-center justify-end gap-4 !mt-10">
        <Button className="" type="submit">Search</Button>
        <Button className="px-8" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export { SearchForm, AdvanceSearchForm };
