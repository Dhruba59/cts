"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Dispatch, SetStateAction } from "react";
import { AdvanceSearchForm, SearchForm, TabSeachForm } from "./search-form";
import { useForm } from "react-hook-form";
import { ReprintMatchReportsType } from ".";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { getAssignedProtocols } from "@/service/subject-service";
import { useQuery } from "react-query";

interface ListHeaderProps {
  setQueryData: Dispatch<SetStateAction<any | undefined>>;
}

const initialValue = {
  protocol: '',
  subjectId: null,
  fromDate: {
    startDate: null,
    endDate: null
  },
  toDate: {
    startDate: null,
    endDate: null
  },
}

const ListHeader = ({ setQueryData }: ListHeaderProps) => {
  const form = useForm<any>({ defaultValues: initialValue });
  const { handleSubmit, reset } = form;

  const { data: protocolList } = useQuery({
    queryFn: getAssignedProtocols,
  });
  const protocolOptions = convertTypeToSelectOption(protocolList?.data ?? []);

  const onSubmit = (values: any) => {
    const params: ReprintMatchReportsType = {
      Protocol: values?.protocol?.value,
      SponsorSubjectId: values.subjectId,
      FromDate: values.fromDate?.startDate,
      ToDate: values.toDate?.startDate
    } 
    setQueryData((data: ReprintMatchReportsType) => ({...data, ...params}));
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs
        title="Subject Management"
        subTitle="Re-Print Match Reports"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={<TabSeachForm form={form} protocolOptions={protocolOptions} />}
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search Sponsor"
          searchFormContents={<SearchForm form={form} protocolOptions={protocolOptions}  />}
          advanceSearchFormContents={<AdvanceSearchForm form={form} />}
          onReset={onReset}
        />
      </form>
    </div>   
  );
};

export default ListHeader;