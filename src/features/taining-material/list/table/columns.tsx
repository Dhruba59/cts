import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import { TrainingMaterialQuery } from "@/model/training-material";
import { ColumnDef } from "@tanstack/react-table";
import Cross from "@/components/icons/cross";
import Link from "next/link";

export const TrainingMaterialListColumns = (): ColumnDef<TrainingMaterialQuery>[] => {
return ([
  {
    header: "Training Name",
    accessorKey: "trainingName",
    cell: ({ row }) => {
      return (
        <div className="">{row.original.trainingName}</div>
      );
    }
  },
  {
    header: "Pass Mark",
    accessorKey: "passMarks",
    cell: ({ row }) => {
      return (
        <div className="">{row.original.passMarks}</div>
      );
    }
  },
  {
    header: "Display Order",
    accessorKey: "displayOrder",
    cell: ({ row }) => {
      return <div className="">{row.original.displayOrder}</div>;
    }
  },
  {
    header: "File Name",
    accessorKey: "fileName",
    cell: ({ row }) => {
      return (
        <div className="">{row.original.fileName}</div>
      );
    }
  },
  {
    header: "File Path",
    accessorKey: "filePath",
    cell: ({ row }) => {
      return (
        <div className="">{row.original.filePath}</div>
      );
    }
  },
  {
    header: "Pre Screen",
    accessorKey: "preScreen",
    cell: ({ row }) => {
      return (
        <div className="min-w-[50px] text-center">
          {row.original.preScreen === null ||
          row.original.preScreen === false ? (
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
          <Link href={`/training-material/${row.original.trainingId}/edit`}><Edit/></Link>
          {/* <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.trainingId)}/> */}
        </div>
      );
    }
  }
])};
