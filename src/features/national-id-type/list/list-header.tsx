"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { useForm } from "react-hook-form";
import { NationalIdTypeQuery } from "@/model/national-id-type";
import { useGetNidCountryDropdownOptions } from "@/hooks/rq-hooks/national-id-type-hooks";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";
import { TabSearchBar } from "@/components/others/tab-searchbar";

const defaultValues: NationalIdTypeQuery = {
  typeName: '',
  description: '',
  countryId: 0,
}

const ListHeader = ({ setQueryData }: any) => {
  const {data: countryDropdown} = useGetNidCountryDropdownOptions();
  const countryOptions = convertTypeToSelectOption(countryDropdown?.data?.countries);

  const form = useForm<NationalIdTypeQuery>({ defaultValues: defaultValues });
  const { handleSubmit, reset } = form;

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      countryId: value?.countryId?.value
    }
    setQueryData(params);
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs title="NID Type" subTitle="NID Type List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={
            <TabSearchBarContent
              form={form}
              countryOptions={countryOptions}
            />
          }
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search"
          searchFormContents={
            <SearchForm
              form={form}
              countryOptions={countryOptions}
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