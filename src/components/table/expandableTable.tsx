import { useRouter } from "next/navigation";
import Button from "../ui/button";
import ExpandableTableCard from "./expandableTableCard";
import { MenuItemProps } from "@/model/menu-items";
import Spinner from "../ui/spinner";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  tableTitle?: string;
  addButtonLink?: string;
  listTitleKey: string; // will be used to get the title element of list
  columns: any;
  data: any;
  getRowActions?: (item: any) => MenuItemProps[],
  isLoading?: boolean;
}

const ExpandableTable = ({
  columns,
  data,
  tableTitle,
  addButtonLink,
  listTitleKey,
  getRowActions,
  isLoading,
  ...props
}: Props) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="w-full h-full p-10 flex justify-center items-center">
        <Spinner size="large" />
      </div>)
  }

  return (
    <div className="" {...props}>
      {tableTitle && (
        <div className="flex justify-between item-center py-2 px-2 bg-white dark:text-white/80 dark:bg-dark-lightBlue shadow rounded-t-md mb-2">
          <h4 className="">
            {tableTitle}
          </h4>
          <Button variant="secondary" size="small"
            onClick={() => router.push(addButtonLink ?? "")} className="outline-primary font-bold py-2 px-4 rounded inline-flex items-center">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path
                fill="currentColor"
                d="M15.5 6H10V.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V6H.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5H6v5.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5V10h5.5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5z"
              />
            </svg>
            <span> Add New </span>
          </Button>
        </div>

      )}
      {data?.map((item: any, index: number) => (
        <ExpandableTableCard
          key={index}
          item={item}
          columns={columns}
          listTitleKey={listTitleKey}
          getRowActions={getRowActions}
        />
      ))}
    </div>
  );
};

export default ExpandableTable;