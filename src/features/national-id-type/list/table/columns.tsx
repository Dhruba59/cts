import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication, IndicationQuery } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";
import { NationalIdTypeColumnsProps, NationalIdTypeQuery } from "@/model/national-id-type";


export const NationalIdTypeListColumns = ({ onDelete }: NationalIdTypeColumnsProps): ColumnDef<NationalIdTypeQuery>[] => {
return ([

  {
    header: "NationalID Type Name",
    accessorKey: "nationalIdtypeName",
    cell: ({ row }) => {
      return (
        <div>{row.original.nationalIdtypeName}</div>
      );
    }
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.description}</div>
      );
    }
  },
  {
    header: "Country",
    accessorKey: "frequencyType",
    cell: ({ row }) => {
      return <div>{row.original.frequencyType}</div>;
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
          <Link href={`/national-id-type/${row.original.nationalTypeId}/edit`}><Edit/></Link>
          <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.nationalTypeId)}/>
        </div>
      );
    }
  }
])};
