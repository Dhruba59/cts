import { ErrorIcon } from "@/assets/icons";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import InputFieldWithRegexValidation from "@/components/ui/inputfield-with-regex";
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
  onResetSearchFields: () => void;
  // reset: any;
}

interface AdvanceSearchFormProps {
  form: UseFormReturn;
  onResetSearchFields: () => void;
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

const SearchForm = ({ isAdvancedOpen, form, onResetSearchFields }: SearchFormProps) => {
  const { control, register, reset, formState: { errors } } = form;
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
    }));
  }

  const onReset = () => {
    reset();
    onResetSearchFields();
  }

  useEffect(() => {
    console.log(protocolList?.data);
    setProtocolOptions(convertTypeToSelectOption(protocolList?.data));
  }, [protocolList]);

  useEffect(() => {
    setUserOptions(convertTypeToSelectOption(userList?.data?.users));
  }, [userList]);

  return (
    <div className="flex items-end gap-3 md:gap-6 py-4 md:py-0">
      {isSysAdmin &&
        <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
          <Label label="User: " className="hidden lg:block" />
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
        <div className="flex">
          <Controller
            control={control}
            name='protocol'
            // rules={{
            //   required: "Protocol is required!",
            // }}
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
          {/* {errors.protocol && (
            <span className="text-red-500 mt-2 ml-1"><ErrorIcon /></span>
          )} */}
        </div>

      </div>

      <Button className={`mb-[1px] w-fit ${isAdvancedOpen ? 'hidden' : 'block'}`} type="submit" >Search</Button>
      <Button
        className={`mb-[1px] w-fit ${isAdvancedOpen ? "hidden" : "block"}`}
        onClick={onReset}
        variant="outline"
        type="button">
        Reset
      </Button>
    </div>
  );
};

const AdvanceSearchForm = ({ form, onResetSearchFields }: AdvanceSearchFormProps) => {
  const { control, register, reset, formState: { errors } } = form;

  const onReset = () => {
    reset();
    onResetSearchFields();
  }
  return (
    <div className="hidden lg:block p-6 space-y-6">
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-x-16">
        <div>
          <Label label="Subject Initials" className="inline-block mb-2" />
          <div className="grid grid-cols-3 gap-x-2">
            <Controller
              control={control}
              name="firstInitial"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "Only one alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  placeholder="F"
                  maxLength={1}
                  // disabled={!protocolId && !ids}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
            {/* <Input
              placeholder="F"
              {...register("firstInitial", {
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              })}
              maxLength={1}
              type="text"
            /> */}

            <Controller
              control={control}
              name="middleInitial"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "Only one alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  placeholder="M"
                  maxLength={1}
                  // disabled={!protocolId && !ids}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
            {/* <Input
              placeholder="M"
              {...register("middleInitial", {
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              })}
              maxLength={1}
              type="text"
            /> */}

            <Controller
              control={control}
              name="lastInitial"
              rules={{
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "Only one alphabetic character allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputFieldWithRegexValidation
                  placeholder="L"
                  maxLength={1}
                  // disabled={!protocolId && !ids}
                  onChange={onChange}
                  value={value}
                  regex={/^[a-zA-Z]*$/}
                />
              )}
            />
            {/* <Input
              placeholder="L"
              {...register("lastInitial", {
                pattern: {
                  value: /^[a-zA-Z]$/,
                  message: "One alphabetic character allowed",
                },
              })}
              maxLength={1}
              type="text"
            /> */}
          </div>
          {(errors.firstInitial ||
            errors.middleInitial ||
            errors.lastInitial) && (
            <span className="text-red-500">
              Single alphabetic character allowed
            </span>
          )}
        </div>
        <Input
          placeholder="Enter subject id"
          label="Subject id"
          className=""
          {...register("subjectId")}
        />
        <Controller
          control={control}
          name="fromDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
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
        <Button className="" type="submit">
          Search
        </Button>
        <Button className="px-8" type="button" variant="outline" onClick={onReset}>
          reset
        </Button>
      </div>
    </div>
  );
};

export { SearchForm, AdvanceSearchForm };
