import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import { ChangeRequestAuditModel } from "@/model/change-request";
import { formateTableDate, formateTableDateTime } from "@/utils/helpers";
import ChangeRequestAuditDetailModal from "../detail/table/change-request-audit-detail-modal";

type ChangeRequestAuditListColumnsProps = {
  onDelete: (id: any) => void
}
export const ChangeRequestAuditListColumns = ({ onDelete }: ChangeRequestAuditListColumnsProps)
: ColumnDef<ChangeRequestAuditModel>[] => {
return ([

  {
    header: "Modified Date",
    accessorKey: "approvedDate",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{formateTableDateTime(row.original.approvedDate)}</div>
      );
    }
  },
  {
    header: "Approver",
    accessorKey: "approver",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.approver}</div>
      );
    }
  },
  {
    header: "Subject ID",
    accessorKey: "subjectId",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.subjectId}</div>;
    }
  },
  {
    header: "Site",
    accessorKey: "siteName",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.siteName}</div>;
    }
  },
  {
    header: "Study",
    accessorKey: "studyName",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.studyName}</div>;
    }
  },
  {
    header: "Protocol",
    accessorKey: "protocolNumber",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.protocolNumber}</div>;
    }
  }, 
  {
    header: "Subject Name",
    accessorKey: "sponsorSubjectId",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.sponsorSubjectId}</div>;
    }
  },
  {
    header: "Subject Initials",
    accessorKey: "firstInit",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{`${row.original.firstInit}${row.original.secondInit}${row.original.thirdInit}`}</div>;
    }
  },
  {
    header: "DOB",
    accessorKey: "dateOfBirth",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{formateTableDate(row.original.dateOfBirth)}</div>;
    }
  },
  {
    id: "actions",
    header: "Action",
    size: 140,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-6">
           <ChangeRequestAuditDetailModal  subjectId={row.original.subjectId} regionGroupsId={row.original.regionGroupsId}/>
        </div>
      );
    }
  }
])};