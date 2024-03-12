import { ReactNode, useEffect, useState } from "react";
import Toggle from "../ui/toggle";
import Button from "../ui/button";
import { useShouldRenderComponentOnResize } from "@/hooks/resize-hook";
import { DesktopSearchBarProps, DesktopSearchFormProps } from "@/model/others";

export const DesktopSearchBar = ( {title, searchFormContents, advanceSearchFormContents, onReset }: DesktopSearchBarProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const shouldRender = useShouldRenderComponentOnResize({ minWidth: 768, maxWidth: 99999 });

  if (!shouldRender) {
    return null;
  }

  return (
    <section className="wrapper">
      <div className="flex flex-row items-center justify-between gap-1 px-2 py-2">
        <div className="w-24 xl:w-32">
          <h4 className="">{title}</h4>
        </div>
        <div className="">
          <SearchForm formContent={searchFormContents} isAdvancedOpen={isChecked} onReset={onReset}/> 
        </div>
        <div className="w-22 ">
          <Toggle
            prefixLabel="More: "
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </div>
      </div>
      <hr />
      {isChecked && <AdvancedSearchForm formContent={advanceSearchFormContents} onReset={onReset} /> }
    </section>
  );
};

const SearchForm = ({ formContent, isAdvancedOpen, onReset }: DesktopSearchFormProps) => {
  return (
    <div className="flex items-end gap-2 md:gap-3 p-4 md:p-0">
      {formContent}
      <div className={`flex gap-2 ${isAdvancedOpen ? 'hidden' : 'block'}`}>
        <Button type="submit" className="!h-10 mb-[1px]">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

const AdvancedSearchForm = ({
  formContent,
  onReset,
}: Omit<DesktopSearchFormProps, "isAdvancedOpen">) => {
  return (
    <div className="p-6 space-y-4">
      <div className='flex flex-wrap justify-start items-start gap-4'>{formContent}</div>
      <div className="flex justify-end gap-4">
        <Button type="submit" className="px-8">
          Submit
        </Button>
        <Button
          type="button"
          className="px-8"
          variant="outline"
          onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};