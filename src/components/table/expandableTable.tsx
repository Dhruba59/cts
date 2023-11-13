import ExpandableTableCard from "./expandableTableCard";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  tableTitle?: string;
  listTitleKey: string; // will be used to get the title element of list
  columns: any;
  data: any;
}

const ExpandableTable = ({
  columns,
  data,
  tableTitle,
  listTitleKey,
  ...props
}: Props) => {
  return (
    <div className="px-4" {...props}>
      {tableTitle && (
        <h4 className="bg-white text-neutral-black py-3 px-6 shadow rounded-t-md mb-2">
          {tableTitle}
        </h4>
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