import Check from "@/components/icons/check";
import Warning from "@/components/icons/warning";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import { formateTableDate } from "@/utils/helpers";
import ChangeRequestDashboardModal from "./detail/change-request-dashboard-modal";
import { ChangeRequestDashboardModel, ChangeRequestDashboardQuery } from "@/model/change-request";
import { useSession } from "next-auth/react";
import { USER_ROLE_ENUM } from "@/model/enum";
import View from "@/components/icons/view";

type ChangeRequestDashboardListColumnsProps = {
  onViewDetail: (id: any, pending: boolean) => void,
  onReject: (id: any) => void,
  onAccept: (id: any) => void,
  isSysAdmin: boolean,
}

export const ChangeRequestDashboardListColumns = ({ onViewDetail, onAccept, onReject, isSysAdmin }
  : ChangeRequestDashboardListColumnsProps): ColumnDef<ChangeRequestDashboardModel>[] => {



  return ([
    {
      header: "User Name",
      accessorKey: "requestedUserName",
      cell: ({ row }) => {
        return (
          <div className="min-w-[100px]">{row.original.requestedUserName}</div>
        );
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
      header: "Subject ID",
      accessorKey: "sponsorSubjectId",
      cell: ({ row }) => {
        return <div className=" min-w-[100px]">{row.original.sponsorSubjectId}</div>;
      }
    },
    {
      header: "Initials",
      accessorKey: "firstInit",
      cell: ({ row }) => {
        return <div className=" min-w-[100px]">{`${row.original.firstInit} ${row.original.secondInit} ${row.original.thirdInit}`}</div>;
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
      header: "DOB",
      accessorKey: "dateOfBirth",
      cell: ({ row }) => {
        return <div className=" min-w-[100px]">{formateTableDate(row.original.dateOfBirth)}</div>;
      }
    },
    {
      header: "Zip",
      accessorKey: "zipCode",
      cell: ({ row }) => {
        return <div className=" min-w-[100px]">{row.original.zipCode}</div>;
      }
    },
    {
      header: "Req & Apv Date",
      accessorKey: "requestedDate",
      cell: ({ row }) => {
        return <div className=" flex flex-col min-w-[100px]">
          <span>{formateTableDate(row.original.requestedDate)}</span>
          <span>{formateTableDate(row.original.approvedDate)}</span>
        </div>;
      }
    },
    {
      header: "Type",
      accessorKey: "requestType",
      enableSorting: false
      // cell: ({ row }) => {
      //   return <div className=" min-w-[100px]">{row.original.requestType}</div>;
      // }
    },
    {
      header: "Status",
      accessorKey: "requestStatus",
      cell: ({ row }) => {
        return (
          <div className="min-w-[50px] text-center">
            {row.original.requestStatus === 'Rejected' && <Cross />}
            {row.original.requestStatus === 'Pending' && <Warning />}
            {row.original.requestStatus === 'Accepted' && <Check />}
          </div>
        );
      }
    },
    {
      id: "actions",
      header: "Action",
      size: 140,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-6">
            <View  className="cursor-pointer" onClick={() => onViewDetail(row.original.requestId, row.original.requestStatus === 'Pending')}/>
            {/* <ChangeRequestDashboardModal requestId={row.original.requestId} onAccept={onAccept} onReject={onReject} isSysAdmin={isSysAdmin}/> */}
            {isSysAdmin && row.original.requestStatus === 'Pending' &&  <>
              <Cross className="cursor-pointer" onClick={() => onReject(row.original.requestId)} />
              <Check className="cursor-pointer" onClick={() => { onAccept(row.original.requestId) }} />
            </>}

          </div>
        );
      }
    }
  ])
};
