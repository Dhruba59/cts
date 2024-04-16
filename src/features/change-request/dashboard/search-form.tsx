import Datepicker from "@/components/ui/datepicker";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { ChangeReqAdvanceSearchProps, ChangeReqDashboardSearchFormProps, ChangeReqTabSearchProps } from "@/model/change-request";
import { USER_ROLE_ENUM } from "@/model/enum";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import { Controller } from "react-hook-form";


export function SearchForm({ form, userTypeOptions, protocolOptions }: ChangeReqDashboardSearchFormProps) {
  const { data: session } = useSession();
  const { control } = form;
  // @ts-ignore
  const isAdmin = session?.user?.currentRole?.roleId == USER_ROLE_ENUM.SYSTEM_ADMIN;

  return (
    <Fragment>
      {isAdmin && (
        <div className="flex lg:flex lg:items-center gap-2 flex-1 md:flex-none">
          <Label label="User Type: " className="hidden xl:block" />
          <Controller
            control={control}
            name="userTypeId"
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Select
                className="w-40"
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
              className="w-40"
              onChange={onChange}
              label=""
              options={protocolOptions}
              value={value}
            />
          )}
        />
      </div>
    </Fragment>
  );
}


export function AdvanceSearchForm({
  requestStatusesOptions,
  form,
}: ChangeReqAdvanceSearchProps) {
  const { control } = form;

  return (
    <Fragment>
        <Controller
          control={control}
          name="requestStatus"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              className="w-40"
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
              containerClassName="w-40"
              label="From Date"
              value={value}
              onChange={onChange}
              placeholder="Select Date"
              useRange={false}
              asSingle
              maxDate={new Date()}
            />
          )}
        />
        <Controller
          control={control}
          name="toDate"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Datepicker
              containerClassName="w-40"
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
}


export const TabSearchBarContent = ({
  form,
  userTypeOptions,
  protocolOptions,
  requestStatusesOptions,
}: ChangeReqTabSearchProps) => {

  const { control } = form;
  const { data: session } = useSession();
  // @ts-ignore
  const isAdmin = session?.user?.currentRole?.roleId == USER_ROLE_ENUM.SYSTEM_ADMIN;
  return (
    <Fragment>
      {isAdmin && (
        <Controller
          control={control}
          name="userTypeId"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <Select
              className="md:w-32 xl:w-36"
              onChange={onChange}
              placeholder="Select User Type"
              options={userTypeOptions}
              value={value}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name="protocolNumber"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            className="md:w-32 xl:w-36"
            onChange={onChange}
            placeholder="Select Protocol"
            options={protocolOptions}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="requestStatus"
        render={({ field: { onChange, onBlur, value } }: any) => (
          <Select
            onChange={onChange}
            placeholder="Select Request Status"
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
            value={value}
            onChange={onChange}
            placeholder="Select From Date"
            useRange={false}
            asSingle
            maxDate={new Date()}
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
            placeholder="Select To Date"
            useRange={false}
            asSingle
          />
        )}
      />
    </Fragment>
  );
};
