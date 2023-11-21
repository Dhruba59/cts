import Check from "@/components/icons/check";
import Error from "@/components/icons/error";
import DeleteOutlined from "@/components/icons/deleteOutlined";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";

export const LIST_COLUMN: ColumnDef<Indication>[] = [

  {
    header: "Indication Name",
    accessorKey: "indicationName",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.indicationName}</div>
      );
    }
  },
  {
    header: "Code",
    accessorKey: "code"
  },
  {
    header: "Code Type",
    accessorKey: "codeType",
    cell: ({ row }) => {
      return <div className=" min-w-[100px]">{row.original.codeType}</div>;
    }
  },
  {
    header: "Description",
    accessorKey: "description"
  },
  {
    header: "Require Details",
    accessorKey: "isRequireDetails",
    cell: ({ row }) => {
      return (
        <div className="min-w-[50px] text-center">
          {row.original.isRequireDetails === null ||
          row.original.isRequireDetails === false ? (
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
          <View />
          <Edit />
          <DeleteOutlined />
        </div>
      );
    }
  }
];
