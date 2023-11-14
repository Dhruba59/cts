import DeleteOutlined from "@/components/icons/deleteOutlined";
import Edit from "@/components/icons/edit";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { Indication } from "@/model/indication";
import { ColumnDef } from "@tanstack/react-table";


export const LIST_COLUMN: ColumnDef<Indication>[] = [
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
    header: "Code",
    accessorKey: "code",
  },
  {
    header: "Indication Name",
    accessorKey: "indicationName",
    cell: ({ row }) => {
      return (
        <div className=" min-w-[200px]">{row.original.indicationName}</div>
      );
    },
  },
  {
    header: "Code Type",
    accessorKey: "codeType",
  },
  // {
  //   header: "Require Details",
  //   accessorKey: "required_details",
  //   cell: ({ row }) => {
  //     return <div className="">{row.original.in}</div>;
  //   },
  // },
  {
    id: "actions",
    header: "Action",
    size: 140,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-6">
          <Edit />
          <DeleteOutlined />
        </div>
      );
    },
  },
];
