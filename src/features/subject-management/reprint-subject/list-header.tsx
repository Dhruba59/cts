"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Dispatch, SetStateAction } from "react";
import { AdvanceSearchForm, SearchForm, TabSearchContent } from "./search-form";
import { useForm } from "react-hook-form";
import { LastReprintSubjectsParams } from "@/model/subject";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import { initialDefaultQuery } from "@/utils/helpers";

interface ListHeaderProps {
  setQueryData: Dispatch<SetStateAction<LastReprintSubjectsParams>>;
}

const currentDate = new Date();
const sixMonthsAgo = new Date(currentDate);
sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
const initialValue = {
  user: '',
  protocol: '',
  firstInitial: '',
  middleInitial: '',
  lastInitial: '',
  subjectId: '',
  fromDate: {
    startDate: sixMonthsAgo,
    endDate: sixMonthsAgo
  },
  toDate: {
    startDate: currentDate,
    endDate: currentDate
  }
}

const ListHeader = ({ setQueryData }: ListHeaderProps) => {

  const form = useForm<any>({
    defaultValues: initialValue
  });
  const { handleSubmit, reset } = form;

  const onSubmit = (values: any) => {
    const params: Omit<LastReprintSubjectsParams, 'PageSize' | 'OrderBy'> = {
      //UserId: values?.user?.value,
      UserName: values?.user?.label,
      ProtocolNumber: values?.protocol?.label,
      SponsorSubjectId: values.subjectId,
      FirstInitial: values.firstInitial,
      MiddleInitial: values.middleInitial,
      LastInitial: values.lastInitial,
      FromDate: values.fromDate?.startDate,
      ToDate: values.toDate?.startDate,
    }
    setQueryData((data) => ({
      ...data as LastReprintSubjectsParams,
      ...params
    }));
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs title="Subject Information" subTitle="Reprint Subject" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={<TabSearchContent form={form} />}
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search"
          searchFormContents={<SearchForm form={form} />}
          advanceSearchFormContents={<AdvanceSearchForm form={form} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;
