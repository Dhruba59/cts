"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Toggle from "@/components/ui/toggle";
import { Dispatch, SetStateAction, useState } from "react";
import { AdvanceSearchForm, SearchForm } from "./search-form";
import { useForm } from "react-hook-form";
import { LastReprintSubjectsParams, SearchLastSubjectsParams } from "@/model/subject";
import { useSession } from "next-auth/react";

interface ListHeaderProps {
  setQueryData: Dispatch<SetStateAction<LastReprintSubjectsParams | undefined>>;
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
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<any>({
    defaultValues: initialValue
  });
  const { handleSubmit } = form;

  const onSubmit = (values: any) => {
    console.log(values);
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

  const onResetSearchFields = () => {
    setQueryData({});
  }

  return (
    <div className="sm:wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Breadcrumbs title="Study Information" subTitle="Study List" />
        <div className="flex flex-row items-center justify-between gap-2 px-0 sm:px-6 py-3">
          <h4 className="hidden lg:block">
            Search Study
          </h4>
          <div className="">
            <SearchForm isAdvancedOpen={isChecked} form={form} onResetSearchFields={onResetSearchFields}/>
          </div>
          <Toggle
            prefixLabel="More: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr />
        {isChecked && <AdvanceSearchForm form={form} onResetSearchFields={onResetSearchFields}/>}
      </form>
    </div>
  );
};

export default ListHeader;
