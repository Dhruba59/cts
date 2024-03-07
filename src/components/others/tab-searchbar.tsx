import { DownArrowIcon } from "@/assets/icons";
import { TabSearchBarProps } from "@/model/common";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import { useShouldRenderComponentOnResize } from "@/hooks/resize-hook";

export const TabSearchBar = ({ formContent, onReset }: TabSearchBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const shouldRender = useShouldRenderComponentOnResize({ minWidth: 0, maxWidth: 767 });

  if (!shouldRender) {
    return null;
  }

  return(
    <div className="flex wrapper flex-col md:hidden gap-2 rounded-md bg-white dark:bg-dark-lightBlue p-2">
      <div className="flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-semibold text-lg">Search</span>
        <DownArrowIcon fill='white' className={`cursor-pointer ${isOpen ? 'rotate-180': 'rotate-0'}`}/>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${isOpen ? 'block': 'hidden'}`}>
        {formContent}
        <div className="flex justify-center gap-4 mt-2 col-span-1 sm:col-span-2">
          <Button size="small" type="submit" className="px-2">Search</Button>
          <Button size="small" type="button" className="px-2" variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
      
    </div>
  );
};

