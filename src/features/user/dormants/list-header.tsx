"use client";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SearchForm } from "./search-form";
import { useForm } from "react-hook-form";
import { UserQuery } from "@/model/user";
import { initialDefaultQuery } from "@/utils/helpers";
import { TabSearchBar } from "@/components/others/tab-searchbar";
import { DesktopSearchBar } from "@/components/others/desktop-searchbar";

const defaultValues = {
  inactiveMonth: null
}
const ListHeader = ({ setQueryData }: any) => {

  const form = useForm<UserQuery>({ defaultValues });
  const { handleSubmit, reset } = form;

  const onSubmit = (value: any) => {
    const params = {
      ...value,
      inactiveMonth: value?.inactiveMonth?.value
    }
    setQueryData(params);
  }

  const onReset = () => {
    reset();
    setQueryData(initialDefaultQuery);
  }

  return (
    <div>
      <Breadcrumbs title="Dormant User" subTitle="Dormant User List" />
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
