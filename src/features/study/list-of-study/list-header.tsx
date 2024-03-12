"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Dispatch, SetStateAction } from "react";
import { AdvanceSearchForm, SearchForm, TabSearchBarContent } from "./search-form";
import { StudyListFormValues, StudyListQueryData } from "@/model/study";
import { useForm } from "react-hook-form";
import { useGetStudyDropdownsList } from "@/hooks/rq-hooks/study-hooks";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";

interface ListHeaderProps {
  setQueryData: Dispatch<SetStateAction<StudyListQueryData>>;
}

const intialStudySearchValues = {
  date: {
    startDate: null,
    endDate: null
  },
  ProtocolNumber: undefined,
  StudyName: undefined,
  StudyStartDate: undefined,
  StudyEndDate: undefined,
  MaxSubjects: undefined,
  SponsorId: undefined,
  Phase: undefined,
  PreScreen: undefined,
  Active: undefined,
  SubjectIdentryFormat: undefined,
  Sr: undefined,
  pageSize: DEFAULT_PAGE_SIZE,
  pageNumber: 1
}

const ListHeader = ({ setQueryData }: ListHeaderProps) => {

  const { data: StudydropdownList, error, isLoading, refetch } = useGetStudyDropdownsList();
  const form = useForm<StudyListFormValues>({
    defaultValues: intialStudySearchValues
  });
  const { handleSubmit, reset } = form;
  const phaseOptions = convertTypeToSelectOption(StudydropdownList?.data?.phases);
  const sponsorOptions = convertTypeToSelectOption(StudydropdownList?.data?.sponsors);

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      StudyStartDate: value?.date?.startDate,
      StudyEndDate: value?.date?.endDate,
      SponsorId: value?.SponsorId?.value,
      Phase: value?.Phase?.value
    }
    delete params.date;
    setQueryData(params);
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs title="Study Information" subTitle="Study List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={<TabSearchBarContent phaseOptions={phaseOptions} sponsorOptions={sponsorOptions} form={form} />}
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search Sponsor"
          searchFormContents={<SearchForm form={form} />}
          advanceSearchFormContents={<AdvanceSearchForm phaseOptions={phaseOptions} sponsorOptions={sponsorOptions} form={form} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;
