import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { BasicTabSearchBarContentsProps } from "@/model/common";
import { SelectOptionType } from "@/model/drop-down-list";
import { IndicationQuery } from "@/model/indication";
import { Dispatch, Fragment, SetStateAction } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface SearchFormProps {
  isAdvancedOpen: boolean;
  form: UseFormReturn;
  setQueryData: Dispatch<SetStateAction<IndicationQuery>>;
}

interface AdvanceSearchFormProps extends BasicTabSearchBarContentsProps{
  userTypeOptions: SelectOptionType[];
  sponsorOptions: SelectOptionType[];
  siteOptions: SelectOptionType[];
  suprressMatchTypeOptions: SelectOptionType[];
}

export function SearchForm({ form }: BasicTabSearchBarContentsProps) {
  const { register } = form;

  return (
    <Fragment>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Email: " className="hidden lg:block" />
        <Input
          className="w-40"
          placeholder="Enter Email"
          {...register("email")}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="System Login: " className="hidden lg:block" />
        <div className="w-40">
          <Input
            placeholder="Enter system login"
            {...register("systemLogin", {})}
          />
        </div>
      </div>
    </Fragment>
  );
}

export function AdvanceSearchForm({
  form,
  userTypeOptions,
  sponsorOptions,
  siteOptions,
  suprressMatchTypeOptions,
}: AdvanceSearchFormProps) {
  const { register, control } = form;

  return (
    <Fragment>
      <Input
        label="First Name"
        className="w-auto md:w-40"
        placeholder="Enter First name"
        {...register("firstName")}
      />
      <Input
        label="Middle Name"
        className="w-auto md:w-40"
        placeholder="Enter Middle Name"
        {...register("middleName")}
      />
      <Input
        label="Last Name"
        className="w-auto md:w-40"
        placeholder="Enter last name"
        {...register("lastName")}
      />
      <Input
        label="Title"
        className="w-auto md:w-40"
        placeholder="Enter Title"
        {...register("title")}
      />
      <Controller
        control={control}
        name="userType"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="w-auto md:w-40"
            onChange={onChange}
            label="User type"
            options={userTypeOptions}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="sponsor"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="w-auto md:w-40"
            onChange={onChange}
            label="Sponsor"
            options={sponsorOptions}
            value={value}
          />
        )}
      />
      <Input
        label="City"
        className="w-auto md:w-40"
        placeholder="Enter City"
        {...register("city")}
      />
      <Input
        label="State"
        className="w-auto md:w-40"
        placeholder="Enter State"
        {...register("state")}
      />
      <Input
        label="Zip Code"
        className="w-auto md:w-40"
        placeholder="Enter zip code"
        {...register("zip")}
      />
      <Controller
        control={control}
        name="SuppressMatchType"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="w-auto md:w-40"
            onChange={onChange}
            label="Suppress Match Type"
            options={suprressMatchTypeOptions}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="Site"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            onChange={onChange}
            className="w-auto md:w-40"
            label="Site"
            options={siteOptions}
            value={value}
          />
        )}
      />
    </Fragment>
  );
}

export const TabSearchBarContent = ({
  form,
  userTypeOptions,
  sponsorOptions,
  siteOptions,
  suprressMatchTypeOptions,
}: AdvanceSearchFormProps) => {
  const { control, register } = form;
  return (
    <Fragment>
      <Input
        placeholder="Enter Email"
        {...register("email")}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter system login"
        {...register("systemLogin", {})}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter First name"
        {...register("firstName")}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter Middle Name"
        {...register("middleName")}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter last name"
        {...register("lastName")}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter Title"
        {...register("title")}
      />
      <Controller
        control={control}
        name="userType"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="w-auto md:w-40"
            onChange={onChange}
            placeholder="Enter User type"
            options={userTypeOptions}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="sponsor"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="w-auto md:w-40"
            onChange={onChange}
            placeholder="Enter Sponsor"
            options={sponsorOptions}
            value={value}
          />
        )}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter City"
        {...register("city")}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter State"
        {...register("state")}
      />
      <Input
        wrapperClassName="w-auto md:w-40"
        placeholder="Enter zip code"
        {...register("zip")}
      />
      <Controller
        control={control}
        name="SuppressMatchType"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="w-auto md:w-40"
            onChange={onChange}
            placeholder="Enter Suppress Match Type"
            options={suprressMatchTypeOptions}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="Site"
        rules={{}}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            onChange={onChange}
            className="w-auto md:w-40"
            placeholder="Select Site"
            options={siteOptions}
            value={value}
          />
        )}
      />
    </Fragment>
  );
};
