import Edit from "@/components/icons/edit";
import { Sponsor, SponsorListColumnsProps } from "@/model/sponsor";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";


export const SponsorListColumns = ({ onDelete }: SponsorListColumnsProps): ColumnDef<Sponsor>[] => {
return ([

  {
    header: "Sponsor Name",
    accessorKey: "sponsorName",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.sponsorName}</div>
      );
    }
  },
  {
    header: "Address One",
    accessorKey: "address1",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.address1}</div>;
    }
  },
  {
    header: "Address Two",
    accessorKey: "address2",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.address2}</div>;
    }
  },
  {
    header: "Address Three",
    accessorKey: "address3",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.address3}</div>;
    }
  },
  {
    header: "City",
    accessorKey: "city",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.city}</div>;
    }
  },
  {
    header: "State",
    accessorKey: "state",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.state}</div>;
    }
  },
  {
    header: "Zip",
    accessorKey: "zip",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.zip}</div>;
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
          <Link href={`/sponsor/${row.original.sponsorId}/edit`}><Edit/></Link>
          <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.sponsorId)}/>
        </div>
      );
    }
  }
])};
