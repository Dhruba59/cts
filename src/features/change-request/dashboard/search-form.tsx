import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { USER_ROLE_ENUM } from "@/model/enum";
import { CodeType } from "@/model/indication";
import { getIndicationCodeTypes } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface SearchFormProps {
  isAdvancedOpen: boolean;
  dropDown: any;
  register: any;
  Controller: any;
  control: any;
  reset: any;
  setQueryData: any;
}
export function SearchForm({
  isAdvancedOpen,
  dropDown,
  register,
  Controller,
  control,
  reset,
  setQueryData
}: SearchFormProps) {
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>([]);
  const [userTypeOptions, setUserTypeOptions] = useState<SelectOptionType[]>([]);
  const { data: session } = useSession();
  // @ts-ignore
  const isAdmin = session?.user?.currentRole?.roleId == USER_ROLE_ENUM.SYSTEM_ADMIN;

  const onReset = () => {
    reset();
    setQueryData();
  }

  useEffect(() => {
    setProtocolOptions(convertTypeToSelectOption(dropDown?.protocols));
    setUserTypeOptions(convertTypeToSelectOption(dropDown?.userTypes));
  }, [dropDown]);

  return (
    <div className="flex justify-start gap-2 md:gap-3">
      {isAdmin && (
        <div className="flex lg:flex lg:items-center gap-2 flex-1 md:flex-none">
          <Label label="User Type: " className="hidden xl:block" />
          <Controller
            control={control}
            name="userTypeId"
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                className="md:w-32 xl:w-36"
                onChange={onChange}
                label=""
                options={userTypeOptions}
                value={value}
              />
            )}
          />
        </div>
      )}
      <div className="flex lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden xl:block" />
        <Controller
          control={control}
          name="protocolNumber"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              className="md:w-32 xl:w-36"
              onChange={onChange}
              label=""
              options={protocolOptions}
              value={value}
            />
          )}
        />
      </div>
      <div className={`flex gap-1 ${isAdvancedOpen ? "hidden" : "block"}`}>
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={() => onReset()}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export function AdvanceSearchForm({
  dropDown,
  register,
  Controller,
  control,
  reset,
  setQueryData
}: any) {
  const defaultValues = {
    codeType: { value: "", label: "Select " },
  };
  const [requestStatusesOptions, setRequestStatusesOptions] = useState<
    SelectOptionType[]
  >([]);
  useEffect(() => {
    setRequestStatusesOptions(
      convertTypeToSelectOption(dropDown?.requestStatuses)
    );
  }, [dropDown]);

  const onReset = () => {
    reset({
      fromDate: {
        startDate: null,
        endDate: null
      },
      toDate: {
        startDate: null,
        endDate: null
      },
    });
    setQueryData();
  }

  return (
    <div className="hidden lg:block p-6 pt-2 space-y-4">
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-2">
        <Controller
          control={control}
          name="requestStatus"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              //className="md:w-36  xl:w-48"
              onChange={onChange}
              label="Request Status"
              options={requestStatusesOptions}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="fromDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              // containerClassName="md:w-36 xl:w-48"
              label="From Date"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
            />
          )}
        />
        <Controller
          control={control}
          name="toDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              // containerClassName="md:w-36 xl:w-48"
              label="To Date"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
            />
          )}
        />
      </div>

      <div className="flex items-center justify-end gap-4 !mt-10">
        <div className="flex gap-3">
          <Button type="submit" className="!h-10 mb-[1px]">
            Search
          </Button>
          <Button type="button" variant="outline" onClick={() => onReset()}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
