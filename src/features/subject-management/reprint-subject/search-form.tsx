import { ErrorIcon } from "@/assets/icons";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { SelectOptionType } from "@/model/drop-down-list";
import { USER_ROLE_ENUM } from "@/model/enum";
import { getProtocolByUserId, getProtocolsByStudyId, getUsersDropdownList } from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { getProtocolsDropdown } from "@/utils/subject";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useQuery } from "react-query";

interface SearchFormProps {
  // register: UseFormRegister<StudyListQueryData>;
  // Controller: React.ElementType;
  // control: Control<StudyListQueryData>;
  isAdvancedOpen: boolean;
  form: UseFormReturn;
  // reset: any;
}

interface AdvanceSearchFormProps {
  form: UseFormReturn;
}

interface UserParams {
  SearchParameter: string;
  Skip: number;
  Take: number;
}

const initialUserParams: UserParams = {
  SearchParameter: '',
  Skip: 0,
  Take: 100
}

const SearchForm = ({ isAdvancedOpen, form }: SearchFormProps) => {
  const { control, register, formState: { errors } } = form;
  const [userOptions, setUserOptions] = useState<SelectOptionType[]>([]);
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>([]);
  const [protocolId, setProtocolId] = useState<number>();
  const [selectedUser, setSelectedUser] = useState<number>();
  const [userParams, setUserParams] = useState<UserParams>(initialUserParams);


  const { data: session } = useSession();
  //@ts-ignore
  const isSysAdmin = session?.user?.currentRole?.roleId === USER_ROLE_ENUM.SYSTEM_ADMIN;


  const { data: protocolList } = useQuery({
    queryFn: getProtocolByUserId,
    queryKey: ['protocolList', { UserId: selectedUser }]
  });

  const { data: userList, isLoading: isUserListLoading } = useQuery({
    queryFn: getUsersDropdownList,
    queryKey: ['userDropdownList', userParams]
  });

  const onFilter = (val: string) => {
    console.log(val);
    setUserParams((data) => ({
      ...data,
      SearchParameter: val
    }))
    // return userOptions;
  }

  useEffect(() => {
    console.log(protocolList?.data);
    setProtocolOptions(convertTypeToSelectOption(protocolList?.data));
  }, [protocolList]);

  useEffect(() => {
    setUserOptions(convertTypeToSelectOption(userList?.data?.users));
  }, [userList]);

  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      {isSysAdmin &&
        <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
          <Label label="User: " className="hidden lg:block" />
          {/* <Select className="md:w-48" /> */}
          <Controller
            control={control}
            name='user'
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                onChange={(option) => {
                  onChange(option);
                  setSelectedUser(option?.value);
                }}
                onInputChange={onFilter}
                options={userOptions}
                value={value}
                isLoading={isUserListLoading}
                className="md:w-48" />
            )}
          />
        </div>
      }

      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Protocol: " className="hidden lg:block" />
        {/* <Select className="md:w-48" /> */}

        <div className="flex">
          <Controller
            control={control}
            name='protocol'
            rules={{
              required: "Protocol is required!",
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                onChange={(option) => {
                  onChange(option);
                  setProtocolId(option.value);
                }}
                options={protocolOptions}
                value={value}

                // filterOption={onFilter}
                className="md:w-48" />
            )}
          />
          {errors.protocol && (
            <span className="text-red-500 mt-2 ml-1"><ErrorIcon /></span>
          )}
        </div>

      </div>

      <Button className={`mb-[1px] w-fit ${isAdvancedOpen ? 'hidden' : 'block'}`} type="submit" >Search</Button>
    </div>
  );
};

const AdvanceSearchForm = ({ form }: AdvanceSearchFormProps) => {
  const { control, register, reset } = form;
  return (
    <div className="hidden lg:block p-6 space-y-6">
      <div className="grid grid-col-1 md:grid-cols-3 gap-x-16">
        <div>
          <Label label="Subject Initials" className="inline-block mb-2" />
          <div className="grid grid-cols-3 gap-x-8">
            <Input placeholder="F" {...register('firstInitial')} />
            <Input placeholder="M" {...register('middleInitial')} />
            <Input placeholder="L" {...register('lastInitial')} />
          </div>
        </div>
        <Input placeholder="Enter subject id" label="Subject id" className="" {...register('subjectId')} />
        <Controller
          control={control}
          name='fromDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              label="from Date"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
            />
          )}
        />
        {/* <Datepicker
          label="Date of Birth"
          value={{ startDate: null, endDate: null }}
          onChange={() => { }}
          placeholder="Select Date"
          useRange={false}
          asSingle
        /> */}
        <Controller
          control={control}
          name='toDate'
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
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
        <Button className="" type="submit">Advance Search</Button>
        <Button className="px-8" variant="outline" onClick={() => reset()}>
          reset
        </Button>
      </div>
    </div>
  );
};

export { SearchForm, AdvanceSearchForm };
