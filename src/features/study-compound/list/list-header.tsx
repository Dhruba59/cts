"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SearchForm } from "./search-form";
import { useForm } from "react-hook-form";
import { StudyCompoundQuery } from "@/model/study-compound";
import { initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";

const defaultValues: StudyCompoundQuery = {
  studyCompoundName: '',
}

const ListHeader = ({ setQueryData }: any) => {

  const form = useForm<StudyCompoundQuery>({
    defaultValues: defaultValues
  });
  const { handleSubmit, reset } = form;

  const onSubmit = (value: any) => {
    setQueryData(value);
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs title="Study Compound" subTitle="Study Compound List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={<SearchForm form={form} />}
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search"
          searchFormContents={<SearchForm form={form} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;