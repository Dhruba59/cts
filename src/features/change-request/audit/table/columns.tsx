import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Warning from "@/components/icons/warning";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import { ChangeRequestAuditModel } from "@/model/change-request";
import { formateTableDate, formateTableDateTime } from "@/utils/helpers";
import ChangeRequestAuditDetailModal from "../detail/table/change-request-audit-detail-modal";

type ChangeRequestAuditListColumnsProps = {
  onViewDetail: (subjectId: number | undefined, regionGroupsId: number | undefined) => void
}
export const ChangeRequestAuditListColumns = ({ onViewDetail }: ChangeRequestAuditListColumnsProps)
: ColumnDef<ChangeRequestAuditModel>[] => {
return [
  {
    header: "Modified Date",
    accessorKey: "approvedDate",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">
          {formateTableDateTime(row.original.approvedDate)}
        </div>
      );
    },
  },
  {
    header: "Approver",
    accessorKey: "approver",
    cell: ({ row }) => {
      return <div className="min-w-[100px]">{row.original.approver}</div>;
    },
  },
  {
    header: "Subject ID",
    accessorKey: "subjectId",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.subjectId}</div>;
    },
  },
  {
    header: "Site",
    accessorKey: "siteName",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.siteName}</div>;
    },
  },
  {
    header: "Study",
    accessorKey: "studyName",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.studyName}</div>;
    },
  },
  {
    header: "Protocol",
    accessorKey: "protocolNumber",
    cell: ({ row }) => {
      return (
        <div className=" min-w-[100px]">{row.original.protocolNumber}</div>
      );
    },
  },
  {
    header: "Subject Name",
    accessorKey: "sponsorSubjectId",
    cell: ({ row }) => {
      return (
        <div className=" min-w-[100px]">{row.original.sponsorSubjectId}</div>
      );
    },
  },
  {
    header: "Subject Initials",
    accessorKey: "firstInit",
    cell: ({ row }) => {
      return (
        <div className=" min-w-[100px]">{`${row.original.firstInit}${row.original.secondInit}${row.original.thirdInit}`}</div>
      );
    },
  },
  {
    header: "DOB",
    accessorKey: "dateOfBirth",
    cell: ({ row }) => {
      return (
        <div className=" min-w-[100px]">
          {formateTableDate(row.original.dateOfBirth)}
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "requestStatus",
    cell: ({ row }) => {
      return (
        <div className="min-w-[50px] text-center">
          {row.original.requestStatus === "Rejected" && <Cross />}
          {row.original.requestStatus === "Pending" && <Warning />}
          {row.original.requestStatus === "Accepted" && <Check />}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    size: 140,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-6">
          <View
            className="cursor-pointer"
            onClick={() =>
              onViewDetail(row.original.subjectId, row.original.regionGroupsId)
            }
          />
          {/* <ChangeRequestAuditDetailModal  subjectId={row.original.subjectId} regionGroupsId={row.original.regionGroupsId}/> */}
        </div>
      );
    },
  },
];};
