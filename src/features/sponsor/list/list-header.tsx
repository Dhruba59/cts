"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SearchForm, AdvanceSearchForm, TabSearchBarContent } from "./search-form";
import { useForm } from "react-hook-form";
import { SponsorQuery } from "@/model/sponsor";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";

const defaultValues: SponsorQuery = {
  sponsorName: null,
  address1: null,
  address2: null,
  city: null,
  zip: null,
  state: null,
  pageNumber: 1,
  pageSize: DEFAULT_PAGE_SIZE
}

const ListHeader = ({ setQueryData }: any) => {

  const form = useForm<SponsorQuery>({
    defaultValues: defaultValues
  });

  const {
    handleSubmit,
    reset,
  } = form;

  const onSubmit = (value: any) => {
    setQueryData(value);
  };

  const onReset = () => {
    setQueryData(initialDefaultQuery);
    reset();
  }

  return (
    <div>
      <Breadcrumbs title="Sponsor" subTitle="Sponsor List" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TabSearchBar
          formContent={<TabSearchBarContent form={form} />}
          onReset={onReset}
        />
        <DesktopSearchBar
          title="Search Sponsor"
          searchFormContents={<SearchForm form={form} />}
          advanceSearchFormContents={<AdvanceSearchForm form={form} />}
          onReset={onReset}
        />
      </form>
    </div>
  );
};

export default ListHeader;
