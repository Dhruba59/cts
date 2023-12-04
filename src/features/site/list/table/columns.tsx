import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import { SiteListColumnsProps, SiteQuery } from "@/model/site";


export const SiteListColumns = ({ onDelete }: SiteListColumnsProps): ColumnDef<SiteQuery>[] => {
return ([

  {
    header: "Site Name",
    accessorKey: "siteName",
    cell: ({ row }) => {
      return (
        <div>{row.original.siteName}</div>
      );
    }
  },
  {
    header: "Site Code",
    accessorKey: "code"
  },
  {
    header: "Address One",
    accessorKey: "address1",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.address1}</div>;
    }
  },
  {
    header: "City",
    accessorKey: "city"
  },
  {
    header: "State",
    accessorKey: "state"
  },
  {
    header: "Zip Code",
    accessorKey: "siteZip"
  },
  {
    header: "PI Name",
    accessorKey: "piname"
  },
  {
    header: "Partial Date Allowed",
    accessorKey: "partialDateAllowed",
    cell: ({ row }) => {
      return (
        <div className="min-w-[50px] text-center">
          {row.original.partialDateAllowed === null ||
          row.original.partialDateAllowed === false ? (
            <Cross />
          ) : (
            <Check />
          )}
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
          {/* <View /> */}
          <Link href={`/site/${row.original.siteId}/edit`}><Edit/></Link>
          <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.siteId)}/>
        </div>
      );
    }
  }
])};
