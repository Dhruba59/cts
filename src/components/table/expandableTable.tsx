import { useRouter } from "next/navigation";
import Button from "../ui/button";
import ExpandableTableCard from "./expandableTableCard";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  tableTitle?: string;
  addButtonLink?: string;
  listTitleKey: string; // will be used to get the title element of list
  columns: any;
  data: any;
}

const ExpandableTable = ({
  columns,
  data,
  tableTitle,
  addButtonLink,
  listTitleKey,
  ...props
}: Props) => {
  const router = useRouter();
  return (
    <div className="" {...props}>
      {tableTitle && (
        <div className="flex justify-between item-center py-2 px-2 bg-white shadow rounded-t-md mb-2">
          <h4 className=" text-neutral-black ">
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
        />
      ))}
    </div>
  );
};

export default ExpandableTable;