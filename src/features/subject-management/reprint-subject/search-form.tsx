import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import InputFieldWithRegexValidation from "@/components/ui/inputfield-with-regex";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { SelectOptionType } from "@/model/drop-down-list";
import { USER_ROLE_ENUM } from "@/model/enum";
import {
  getProtocolByUserId,
  getUsersDropdownList,
} from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "react-query";

interface UserParams {
  SearchParameter: string;
  Skip: number;
  Take: number;
}

const initialUserParams: UserParams = {
  SearchParameter: "",
  Skip: 0,
  Take: 100,
};

const SearchForm = ({ form }: BasicTabSearchBarContentsProps) => {
  const { control } = form;
  const [userOptions, setUserOptions] = useState<SelectOptionType[]>([]);
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>(
    []
  );
  const [protocolId, setProtocolId] = useState<number>();
  const [selectedUser, setSelectedUser] = useState<number>();
  const [userParams, setUserParams] = useState<UserParams>(initialUserParams);

  const { data: session } = useSession();
  //@ts-ignore
  const isSysAdmin = session?.user?.currentRole?.roleId === USER_ROLE_ENUM.SYSTEM_ADMIN;

  const { data: protocolList } = useQuery({
    queryFn: getProtocolByUserId,
    queryKey: ["protocolList", { UserId: selectedUser }],
  });

  const { data: userList, isLoading: isUserListLoading } = useQuery({
    queryFn: getUsersDropdownList,
    queryKey: ["userDropdownList", userParams],
  });

  const onFilter = (val: string) => {
    setUserParams((data) => ({
      ...data,
      SearchParameter: val,
    }));
  };

  useEffect(() => {
    setProtocolOptions(convertTypeToSelectOption(protocolList?.data));
  }, [protocolList]);

  useEffect(() => {
    setUserOptions(convertTypeToSelectOption(userList?.data?.users));
  }, [userList]);

  return (
    <Fragment>
      {isSysAdmin && (
        <div className="flex items-center gap-2">
          <Label label="User: " className="hidden lg:block" />
          <Controller
            control={control}
            name="user"
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
                className="md:w-48"
              />
            )}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Label label="Protocol: " className="hidden lg:block" />
        <Controller
          control={control}
          name="protocol"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={(option) => {
                onChange(option);
                setProtocolId(option.value);
              }}
              options={protocolOptions}
              value={value}
              className="md:w-48"
            />
          )}
        />
      </div>
    </Fragment>
  );
};

const AdvanceSearchForm = ({ form }: BasicTabSearchBarContentsProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <Fragment>
      <div className="w-48">
        <Label label="Subject Initials" className="inline-block mb-2" />
        <div className="flex gap-2">
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
    </Fragment>
  );
};

const TabSearchContent = ({ form }: BasicTabSearchBarContentsProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = form;
  const [userOptions, setUserOptions] = useState<SelectOptionType[]>([]);
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>(
    []
  );
  const [protocolId, setProtocolId] = useState<number>();
  const [selectedUser, setSelectedUser] = useState<number>();
  const [userParams, setUserParams] = useState<UserParams>(initialUserParams);

  const { data: session } = useSession();
  //@ts-ignore
  const isSysAdmin = session?.user?.currentRole?.roleId === USER_ROLE_ENUM.SYSTEM_ADMIN;

  const { data: protocolList } = useQuery({
    queryFn: getProtocolByUserId,
    queryKey: ["protocolList", { UserId: selectedUser }],
  });

  const { data: userList, isLoading: isUserListLoading } = useQuery({
    queryFn: getUsersDropdownList,
    queryKey: ["userDropdownList", userParams],
  });

  const onFilter = (val: string) => {
    setUserParams((data) => ({
      ...data,
      SearchParameter: val,
    }));
  };

  useEffect(() => {
    setProtocolOptions(convertTypeToSelectOption(protocolList?.data));
  }, [protocolList]);

  useEffect(() => {
    setUserOptions(convertTypeToSelectOption(userList?.data?.users));
  }, [userList]);

  return (
    <Fragment>
      {isSysAdmin && (
        <Controller
          control={control}
          name="user"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              onChange={(option) => {
                onChange(option);
                setSelectedUser(option?.value);
              }}
              placeholder="Select User"
              onInputChange={onFilter}
              options={userOptions}
              value={value}
              isLoading={isUserListLoading}
              className="md:w-48"
            />
          )}
        />
      )}
      <Controller
        control={control}
        name="protocol"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            onChange={(option) => {
              onChange(option);
              setProtocolId(option.value);
            }}
            placeholder="Select Protocol"
            options={protocolOptions}
            value={value}
            className="md:w-48"
          />
        )}
      />

      <div className="grid grid-cols-3 gap-2">
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
      </div>
      {(errors.firstInitial || errors.middleInitial || errors.lastInitial) && (
        <span className="text-red-500">
          Single alphabetic character allowed
        </span>
      )}
      <Input
        placeholder="Enter subject id"
        className=""
        {...register("subjectId")}
      />
      <Controller
        control={control}
        name="fromDate"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Datepicker
            value={value}
            onChange={onChange}
            placeholder="Select (From Date)"
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
            value={value}
            onChange={onChange}
            placeholder="Select (To Date)"
            useRange={false}
            asSingle
          />
        )}
      />
    </Fragment>
  );
};

export { SearchForm, AdvanceSearchForm, TabSearchContent };
