"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { useForm } from "react-hook-form";
import { SiteQuery } from "@/model/site";
import { useGetFrequencyTypes } from "@/hooks/rq-hooks/site-hooks";
import { convertTypeToSelectOption, initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";

const defaultValues: SiteQuery = {
  siteId: 0,
  siteName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  siteNumber: '',
  siteZip: '',
  siteCode: '',
  sponsorId: 0,
  frequencyTypeId: 0,
  primaryContactPhone: '',
  primaryContactName: '',
  primaryContactEmail: '',
  locationId: '',
  piname: '',
  active: undefined   
}

const ListHeader = ({ setQueryData }: any) => {
  const form = useForm<SiteQuery>({ defaultValues: defaultValues });
  const { data: frequencyDropDown } = useGetFrequencyTypes();
  const { handleSubmit, reset } = form;
  const frequencyDropDownOptions = convertTypeToSelectOption(
    frequencyDropDown?.data?.countries
  );

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      frequencyTypeId: value?.frequencyTypeId?.value,
    };
    setQueryData(params);
  };

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  };

  return (
    <div>
      <Breadcrumbs title="Site" subTitle="Site List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={
            <TabSearchBarContent
              form={form}
              frequencyDropDownOptions={frequencyDropDownOptions}
            />
          }
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search Site"
          searchFormContents={<SearchForm form={form} />}
          advanceSearchFormContents={
            <AdvanceSearchForm
              form={form}
              frequencyDropDownOptions={frequencyDropDownOptions}
            />
          }
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;
