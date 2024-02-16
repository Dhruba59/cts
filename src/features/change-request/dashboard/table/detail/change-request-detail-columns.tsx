
import { ColumnDef } from "@tanstack/react-table";
import { ChangeRequestReviewDetailModel } from "@/model/change-request";


type ChangeRequestReviewDetailListColumnsProps = {
  // onAccept: (id: any) => void,
  // onReject: (id: any) => void
}
export const ChangeRequestReviewDetailListColumns = ({ }: ChangeRequestReviewDetailListColumnsProps)
: ColumnDef<ChangeRequestReviewDetailModel>[] => {
return ([
  {
    header: "Properties",
    accessorKey: "columnName",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.columnName}</div>
      );
    }
  },
  {
    header: "Existing Record",
    accessorKey: "old",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.old}</div>
      );
    }
  },
  {
    header: "Edited Record",
    accessorKey: "new",
    cell: ({ row }) => {
      return <div className={`min-w-[100px] ${row.original.old !== row.original.new && 'text-red-500'}`}>{row.original.new}</div>;
    }
  }
])};
