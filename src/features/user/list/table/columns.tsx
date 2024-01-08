import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";

type IndicationListColumnsProps = {
  onDelete: (id: any) => void
}
export const getColumns = ({ onDelete }: IndicationListColumnsProps): ColumnDef<any>[] => {
  return ([
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Middle Name",
      accessorKey: "middleName"
    },
    {
      header: "Last Name",
      accessorKey: "lastName"
    },
    {
      header: "System Login",
      accessorKey: "userName"
    },
    {
      header: "User Type",
      accessorKey: "userType",
    },
    {
      header: "Sponsor",
      accessorKey: "sponsor",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Match Type",
      accessorKey: "matchType",
    },

    {
      header: "Assigend Site",
      accessorKey: "assignedSite",
    },

    {
      header: "Assigned Protocols",
      accessorKey: "assignedProtocolCount",
    },
    {
      id: "actions",
      header: "Action",
      size: 140,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-6">
            {/* <View /> */}
            <Link href={`/user/${row.original.userId}/edit`}><Edit /></Link>
            {/* <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.indicationId)}/> */}
          </div>
        );
      }
    }
  ])
};
