import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import { ChangeRequestReprintModel } from "@/model/change-request";
import { formateTableDate } from "@/utils/helpers";
import ChangeRequestModal from "./change-request-modal";
import { SelectOptionType } from "@/model/drop-down-list";
import { MatchReportQueryParams } from "@/model/subject";

type ChangeRequestReprintListColumnsProps = {
  onOpenChangeRequestModal: (subjectId: number | undefined, nationalTypeId: number | undefined, visitTypeId: number | undefined, isPreScreen: boolean | undefined) => void;
}
export const ChangeRequestReprintListColumns = ({ onOpenChangeRequestModal }
  : ChangeRequestReprintListColumnsProps): ColumnDef<ChangeRequestReprintModel>[] => {
  return ([

    {
      header: "Protocol",
      accessorKey: "protocolNumber",
      cell: ({ row }) => {
        return (
          <div className="min-w-[100px]">{row.original.protocolNumber}</div>
        );
      }
    },
    {
      header: "User",
      accessorKey: "userName",
      cell: ({ row }) => {
        return (
          <div className="min-w-[50px]">{row.original.userName}</div>
        );
      }
    },
    {
      header: "Subject ID",
      accessorKey: "sponsorSubjectId",
      cell: ({ row }) => {
        return <div className=" min-w-[50px]">{row.original.sponsorSubjectId}</div>;
      }
    },
    {
      header: "First Init",
      accessorKey: "firstInit",
      cell: ({ row }) => {
        return <div className=" min-w-[50px]">{row.original.firstInit}</div>;
      }
    },
    {
      header: "Second Init",
      accessorKey: "secondInit",
      cell: ({ row }) => {
        return <div className=" min-w-[50px]">{row.original.secondInit}</div>;
      }
    },
    {
      header: "Third Init",
      accessorKey: "thirdInit",
      cell: ({ row }) => {
        return <div className=" min-w-[50px]">{row.original.thirdInit}</div>;
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
      header: "NID",
      accessorKey: "social",
      cell: ({ row }) => {
        return <div className=" min-w-[50px]">{row.original.social}</div>;
      }
    },
    {
      header: "ID Type",
      accessorKey: "nationalTypeId",
      cell: ({ row }) => {
        return <div className=" min-w-[100px]">{row.original.nationalIdTypeName}</div>;
      }
    },
    {
      header: "Sex",
      accessorKey: "gender",
      cell: ({ row }) => {
        return <div className=" min-w-[50px]">{row.original.gender}</div>;
      }
    },
    {
      header: "Site",
      accessorKey: "siteName",
      cell: ({ row }) => {
        return <div className=" min-w-[50px]">{row.original.siteName}</div>;
      }
    },
    {
      header: "Entered Date",
      accessorKey: "dateEntered",
      cell: ({ row }) => {
        return <div className=" min-w-[100px]">{formateTableDate(row.original.dateEntered)}</div>;
      }
    },
    // {
    //   header: "Require Details",
    //   accessorKey: "isRequireDetails",
    //   cell: ({ row }) => {
    //     return (
    //       <div className="min-w-[50px] text-center">
    //         {row.original.isRequireDetails === null ||
    //         row.original.isRequireDetails === false ? (
    //           <Cross />
    //         ) : (
    //           <Check />
    //         )}
    //       </div>
    //     );
    //   }
    // },
    {
      id: "actions",
      header: "Action",
      size: 140,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-6">
            <Link href="" onClick={() => onOpenChangeRequestModal(row.original.subjectId, row.original.nationalTypeId, row.original.visitTypeIdForBusinessLogic, row.original.preScreen )}><Edit/></Link>
            {/* <ChangeRequestModal id={row.original.subjectId + '_' + row.original.nationalTypeId} visitTypeId={row.original.visitTypeIdForBusinessLogic} isPreScreen={row.original.preScreen} onPrintClick={onPrintClick}/> */}
          </div>
        );
      }
    }
  ])
};
