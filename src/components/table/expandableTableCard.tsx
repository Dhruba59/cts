"use client";
import Chevron from "@/components/icons/chevron";
import VerticalDots from "@/components/icons/verticalDots";
import { cn } from "@/libs/utils";
import { useState } from "react";
import Check from "@/components/icons/check";
import Error from "@/components/icons/error";
import { useThemeContext } from "@/context/theme-context";
import { THEME_COLOR_ENUM } from "@/model/context";
import MenuItems from "../menu-item";
import PopUp from "../pop-up/pop-up-2.0";
import { MenuItemProps } from "@/model/menu-items";

interface TableCardProps {
  columns: any;
  item: any;
  listTitleKey: string;
  getRowActions?: (item: any) => MenuItemProps[]
}
const ExpandableTableCard = ({
  item,
  columns,
  listTitleKey,
  getRowActions,
}: TableCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useThemeContext();
  const rowActions = getRowActions?.(item) ?? [];

  const getColumnHeader = (key: string) => {
    const currentCol = columns?.find((col: any) => col?.accessorKey === key);
    return currentCol?.header;
  };

  const getTableData = (data: any) => {
    if (typeof data === "boolean") {
      return data ? <Check /> : <Error />;
    }

    return data;
  };

  return (
    <div className="bg-white dark:text-white/80 dark:bg-dark-lightBlue shadow rounded-md relative mb-2">
      <div className="flex items-center justify-between px-6 py-3 border-b ">
        <h6 className="font-medium text-sm">{item[listTitleKey]}</h6>
        {rowActions.length > 0 && (
          <PopUp
            position="bottom-center"
            content={
              <MenuItems menus={rowActions} className="text-sm font-semibold"/>
            }>
            <VerticalDots
              className="cursor-pointer"
              darkMode={theme === THEME_COLOR_ENUM.DARK}
            />
          </PopUp>
        )}
      </div>
      <div
        className={cn(
          "grid grid-cols-2 px-6 py-3 gap-2 overflow-hidden max-h-[100px] transition-all duration-300 ease-in-out",
          {
            "max-h-[999px]": showDetails,
          }
        )}>
        {Object.keys(item).map((key) => (
          <div key={key}>
            <p className="text-[10px]">{getColumnHeader(key)}</p>
            <div className="text-sm">{getTableData(item[key])}</div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "absolute top-1/2 -right-2.5 bg-white dark:bg-white/80 shadow-md p-1 rounded-full cursor-pointer transition duration-300 rotate-180",
          {
            "rotate-0": showDetails,
          }
        )}
        onClick={() => setShowDetails((prev) => !prev)}>
        <Chevron />
      </div>
    </div>
  );
};

export default ExpandableTableCard;
