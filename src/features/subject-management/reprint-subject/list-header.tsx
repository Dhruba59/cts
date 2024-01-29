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

const initialValue = {
  user: '',
  protocol: '',
  firstInitial: '',
  middleInitial: '',
  lastInitial: '',
  subjectId: '',
  fromDate: {
    startDate: null,
    endDate: null
  },
  toDate: {
    startDate: null,
    endDate: null
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
      ProtocolNumber: values?.protocol?.value,
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

  return (
    <div className="sm:wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Breadcrumbs title="Study Information" subTitle="Study List" />
        <div className="flex flex-row items-center justify-between gap-2 px-0 sm:px-6 py-3">
          <h4 className="hidden lg:block text-neutral-black">
            Search Study
          </h4>
          <div className="">
            <SearchForm isAdvancedOpen={isChecked} form={form} />
          </div>
          <Toggle
            prefixLabel="More: "
            className="hidden lg:block"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
        <hr />
        {isChecked && <AdvanceSearchForm form={form} />}
      </form>
    </div>
  );
};

export default ListHeader;
