import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import View from "@/components/icons/view";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { StudyCompound, StudyCompoundListColumnsProps, StudyCompoundQuery } from "@/model/study-compound";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";
import { DeleteOutlined } from "@/assets/icons";


export const StudyCompoundListColumns = ({ onDelete }: StudyCompoundListColumnsProps)
: ColumnDef<StudyCompoundQuery>[] => {
return ([

  {
    header: "Study Compound Name",
    accessorKey: "studyCompoundName",
    cell: ({ row }) => {
      return (
        <div className="min-w-[100px]">{row.original.studyCompoundName}</div>
      );
    }
  },
  {
    header: "Description",
    accessorKey: "description"
  },
  {
    header: "Active",
    accessorKey: "active",
    cell: ({ row }) => {
      return (
        <div className="min-w-[50px] text-center">
          {row.original.active === null ||
          row.original.active === false ? (
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
          <Link href={`/study-compound/${row.original.studyCompoundId}/edit`}><Edit/></Link>
          <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.studyCompoundId)}/>
        </div>
      );
    }
  }
])};
