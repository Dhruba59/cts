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
    header: "Modified Date",
    accessorKey: "modifyDate",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{formateTableDateTime(row.original.modifyDate)}</div>
      );
    }
  },
  {
    header: "Subject Initial",
    accessorKey: "subjectInitial",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.subjectInitial}</div>
      );
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
    header: "ID Type",
    accessorKey: "nationalIDTypeName",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.nationalIDTypeName}</div>;
    }
  },
  {
    header: "National ID",
    accessorKey: "nationalTypeId",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.nationalTypeId}</div>;
    }
  },
  {
    header: "Sex",
    accessorKey: "gender",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.gender}</div>;
    }
  },
  {
    header: "Subject ID",
    accessorKey: "sponsorSubjectId",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.sponsorSubjectId}</div>;
    }
  }, 
  {
    header: "Height",
    accessorKey: "height",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.height}</div>;
    }
  },
  {
    header: "Weight",
    accessorKey: "weight",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.weight}</div>;
    }
  },
  {
    header: "Action",
    accessorKey: "ActionStatus",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.DateEntered}</div>;
    }
  }
])};
