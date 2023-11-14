"use client";
import Chevron from "@/components/icons/chevron";
import VerticalDots from "@/components/icons/verticalDots";
import { cn } from "@/libs/utils";
import { useState } from "react";
import Check from "@/components/icons/check";
import Error from "@/components/icons/error";
import { Row } from "@tanstack/react-table";

interface TableCardProps {
  columns: any;
  item: any;
  listTitleKey: string;
}
const ExpandableTableCard = ({
  item,
  columns,
  listTitleKey,
}: TableCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

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
    <div className="bg-white shadow rounded-md relative mb-2">
      <div className="flex items-center justify-between px-6 py-3 border-b ">
        <h6 className="font-medium text-sm text-neutral-black">
          {item[listTitleKey]}
        </h6>
        <VerticalDots />
      </div>
      <div
        className={cn(
          "grid grid-cols-2 px-6 py-3 gap-2 overflow-hidden max-h-[100px] transition-all duration-500 ease-in-out",
          {
            "max-h-[999px]": showDetails,
          }
        )}
      >
        {Object.keys(item).map((key) => (
          <div key={key}>
            <p className="text-[10px] text-black/40">{getColumnHeader(key)}</p>
            <div className="text-sm text-black/90">
              {getTableData(item[key])}
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "absolute top-1/2 -right-2.5 bg-white shadow-md p-1 rounded-full cursor-pointer transition duration-300",
          {
            "rotate-180": showDetails,
          }
        )}
        onClick={() => setShowDetails((prev) => !prev)}
      >
        <Chevron />
      </div>
    </div>
  );
};

export default ExpandableTableCard;
