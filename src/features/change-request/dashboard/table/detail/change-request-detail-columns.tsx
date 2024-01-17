import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import { ChangeRequestAuditDetailModel, ChangeRequestAuditModel, ChangeRequestReviewDetailModel } from "@/model/change-request";
import { formateTableDate, formateTableDateTime } from "@/utils/helpers";


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
      return <div className=" min-w-[100px]">{row.original.new}</div>;
    }
  }
])};
