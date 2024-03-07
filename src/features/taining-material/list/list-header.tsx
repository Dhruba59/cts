"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";

import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { useForm } from "react-hook-form";
import { useGetStudyProtocols } from "@/hooks/rq-hooks/training-material-hooks";
import { TrainingMaterialQuery } from "@/model/training-material";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";

const defaultValues: TrainingMaterialQuery = {
  trainingId: null,
  trainingName: '',
  passMarks: null,
  displayOrder: null,
  materialId: null,
  fileName: '',
  filePath: '',
  preScreen: null,
  active: null 
}

const ListHeader = ({ setQueryData }: any) => {
  const { data: studyProtocolDropDown } = useGetStudyProtocols();

  const form = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset } = form;

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      trainingName: value?.trainingName?.label,
    };
    setQueryData(params);
  };

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  const tabFormContent = (
    <TabSearchBarContent
      studyProtocolOptions={convertTypeToSelectOption(
        studyProtocolDropDown?.data?.studyProtocols
      )}
      form={form}
    />
  );

  return (
    <div>
      <Breadcrumbs
        title="Training Meterial"
        subTitle="Training Meterial List"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar formContent={tabFormContent} onReset={onReset} />
        <DesktopSearchBar
          title="Search Training Meterial"
          searchFormContents={
            <SearchForm
              studyProtocolDropDown={studyProtocolDropDown?.data}
              form={form}
            />
          }
          advanceSearchFormContents={<AdvanceSearchForm form={form} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;