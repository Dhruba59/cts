"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { useForm } from "react-hook-form";
import { ChangeRequestDashboardFieldValues } from "@/model/change-request";
import { useDashboardDropdown } from "@/hooks/rq-hooks/change-request-hooks";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";

const defaultValues: ChangeRequestDashboardFieldValues = {
  userTypeId: null,
  protocolNumber: "",
  requestStatus: "",
  fromDate: { startDate: null, endDate: null },
  toDate: { startDate: null, endDate: null },
};

const ListHeader = ({ setQueryData }: any) => {

  const {data: _dropDown} = useDashboardDropdown();
  const protocolOptions = convertTypeToSelectOption(_dropDown?.data?.protocols);
  const requestStatusOptions = convertTypeToSelectOption(_dropDown?.data?.requestStatuses);
  const userTypeOptions = convertTypeToSelectOption(_dropDown?.data?.userTypes);

  const form = useForm<ChangeRequestDashboardFieldValues>({
    defaultValues: defaultValues
  });
  const { handleSubmit, reset } = form;

  const onSubmit = (value: any) => {
    const params = {
      userTypeId: value?.userTypeId?.value,
      protocolNumber: value?.protocolNumber?.label,
      requestStatus: value?.requestStatus?.value,
      toDate: value?.toDate?.startDate,
      fromDate: value?.fromDate?.startDate
    }
    setQueryData(params);
  }

  const tabContent = (
    <TabSearchBarContent
      form={form}
      protocolOptions={protocolOptions}
      requestStatusesOptions={requestStatusOptions}
      userTypeOptions={userTypeOptions}
    />
  );

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <div>
        <Breadcrumbs
          title="Change Request Dashboard"
          subTitle="Change Request Dashboard List"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TabSearchBar formContent={tabContent} onReset={onReset} />
          <DesktopSearchBar
            title="Search"
            searchFormContents={
              <SearchForm
                form={form}
                protocolOptions={protocolOptions}
                userTypeOptions={userTypeOptions}
              />
            }
            advanceSearchFormContents={
              <AdvanceSearchForm
                form={form}
                requestStatusesOptions={requestStatusOptions}
              />
            }
            onReset={onReset}
          />
        </form>
      </div>
    </div>
  );
};

export default ListHeader;
