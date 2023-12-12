import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { User, UserQuery } from "@/model/user";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import { DormantUserListColumnsProps } from "@/model/user";


export const DormantUserListColumns = ({ onDelete }: DormantUserListColumnsProps): ColumnDef<UserQuery>[] => {
return ([
      {
        id: "select",
        size: 10,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
  {
    header: "User Name",
    accessorKey: "userName",
    cell: ({ row }) => {
      return (
        <div className="min-w-[50px]">{row.original.userName}</div>
      );
    }
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.email}</div>
      );
    }
  },
  {
    header: "First Name",
    accessorKey: "firstName",
    cell: ({ row }) => {
      return <div className="min-w-[100px]">{row.original.firstName}</div>;
    }
  },
  // {
  //   header: "Middle Name",
  //   accessorKey: "middleName",
  //   cell: ({ row }) => {
  //     return <div className="">{row.original.middleName}</div>;
  //   }
  // },
  {
    header: "Last Name",
    accessorKey: "lastName",
    cell: ({ row }) => {
      return <div className="min-w-[100px]">{row.original.lastName}</div>;
    }
  },
  {
    header: "Active",
    accessorKey: "active",
    cell: ({ row }) => {
      return (
        <div className="min-w-[50px] text-center">
          {row.original.active === null ||
          row.original.active === 'N' ? (
            <Cross />
          ) : (
            <Check />
          )}
        </div>
      );
    }
  },
  {
    header: "lastLoginTime",
    accessorKey: "Last Login Time",
    cell: ({ row }) => {
      return <div className="">{row.original.lastLoginTime}</div>;
    }
  },
  {
    header: "Inactive Over",
    accessorKey: "inactiveOver",
    cell: ({ row }) => {
      return <div className="">{row.original.inactiveOver}</div>;
    }
  },
  {
    id: "actions",
    header: "Action",
    size: 140,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-6">
          {/* <View /> */}
          <Link href={`/user/${row.original.userId}/edit`}><Edit/></Link>
          <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.userId)}/>
        </div>
      );
    }
  }
])};
