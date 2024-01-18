import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { SelectOptionType } from "@/model/drop-down-list";
import { Controller, UseFormReturn } from "react-hook-form";

interface SearchFormProps {
  isAdvancedOpen: boolean;
  form: UseFormReturn;
}

interface AdvanceSearchFormProps {
  form: UseFormReturn;
  userTypeOptions: SelectOptionType[];
  sponsorOptions: SelectOptionType[];
  siteOptions: SelectOptionType[];
  suprressMatchTypeOptions: SelectOptionType[];
}

export function SearchForm({
  isAdvancedOpen,
  form
}: SearchFormProps) {
  const { register, control, reset } = form;
  return (
    <div className="flex items-end gap-3 md:gap-6 p-4 md:p-0">
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="Email: " className="hidden lg:block" />
        <Input
          placeholder="Enter Email"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email!"
            }
          })}
        />
      </div>
      <div className="grid lg:flex lg:items-center gap-2 flex-1 md:flex-none">
        <Label label="System Login: " className="hidden lg:block" />
        <div className="w-32">
          <Input
            placeholder="Enter system login"
            {...register("systemLogin", {
              // required: "System login is required!"
            })}
          />
        </div>
      </div>
      <div className={`flex gap-3 ${isAdvancedOpen ? 'hidden' : 'block'}`}>
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button type="submit" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export function AdvanceSearchForm({ form, userTypeOptions, sponsorOptions, siteOptions, suprressMatchTypeOptions }: AdvanceSearchFormProps) {
  const { register, control, reset } = form;
  return (
    <div className="hidden lg:block px-6 py-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        <div>
          <Input
            label="First Name"
            placeholder="Enter First name"
            {...register("firstName")}
          />
        </div>
        <div>
          <Input
            label="Middle Name"
            placeholder="Middle Name"
            {...register("middleName")}
          />
        </div>
        <div>
          <Input
            label="Last Name"
            placeholder="Enter last name"
            {...register("lastName")}
          />
        </div>
        <div>
          <Input
            label="Title"
            placeholder="Enter Title"
            {...register("title")}
          />
        </div>
        <div>
          <Controller
            control={control}
            name='userType'
            rules={{
              // required: 'User type is required!',
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                onChange={onChange}
                label="User type"
                options={userTypeOptions}
                value={value} />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name='sponsor'
            rules={{
              // required: 'Sponsor is required!',
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                onChange={onChange}
                label="Sponsor"
                options={sponsorOptions}
                value={value} />
            )}
          />
        </div>
        <div>
          <Input
            label="City"
            placeholder="Enter City"
            {...register("city")}
          />
        </div>
        <div>
          <Input
            label="State"
            placeholder="Enter State"
            {...register("state")}
          />
        </div>
        <div>
          <Input
            label="Zip Code"
            placeholder="Enter zip code"
            {...register("zip")}
          />
        </div>
        <div>
        <Controller
            control={control}
            name='SuppressMatchType'
            rules={{
              // required: 'SuppressMatchType is required!',
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                onChange={onChange}
                label="Suppress Match Type"
                options={suprressMatchTypeOptions}
                value={value} />
            )}
          />
        </div>
        <div>
        <Controller
            control={control}
            name='Site'
            rules={{
              // required: 'Site is required!',
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                onChange={onChange}
                label="Site"
                options={siteOptions}
                value={value} />
            )}
          />
        </div>
        
        {/* <div className="flex flex-col items-start justify-between py-1 pb-4">
              <Label label="Is User Active" />
              <Controller
                name="isUserActive"
                control={control}
                render={({ field: { onChange, onBlur, value } }: any) =>
                  <Checkbox className="" onChange={onChange} value={value} checked={value} />}
              />
            </div> */}

      </div>
      <div className="flex items-center justify-end gap-4 !mt-10">
        <Button className="" type="submit">Search</Button>
        <Button className="px-8" variant="outline" onClick={() => reset()}>
          reset
        </Button>
      </div>
    </div>
  );
}
