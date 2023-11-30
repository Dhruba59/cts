import { DeleteOutlined } from "@/assets/icons";
import Check from "@/components/icons/check";
import Edit from "@/components/icons/edit";
import Error from "@/components/icons/error";
import { StudyListColumnsProps, StuyListType } from "@/model/study";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getColumns = ({ onDelete }: StudyListColumnsProps): ColumnDef<StuyListType>[] => {

  return(
    [
      // {
      //   id: "select",
      //   size: 10,
      //   header: ({ table }) => (
      //     <IndeterminateCheckbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler(),
      //       }}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <div className="">
      //       <IndeterminateCheckbox
      //         {...{
      //           checked: row.getIsSelected(),
      //           disabled: !row.getCanSelect(),
      //           indeterminate: row.getIsSomeSelected(),
      //           onChange: row.getToggleSelectedHandler(),
      //         }}
      //       />
      //     </div>
      //   ),
      // },
      {
        header: "Protocol Number",
        accessorKey: "protocolNumber",
      },
    
      {
        header: "Study Name",
        accessorKey: "studyName",
      },
      {
        header: "Start Date",
        accessorKey: "studyStartDate",
        cell: (row) => {
          if(row.getValue() && typeof(row.getValue()) === 'string') {
            const date = new Date(row.getValue() as string);
            return date.toLocaleDateString();
          }
        }
      },
      {
        header: "End Date",
        accessorKey: "studyEndDate",
        cell: (row) => {
          if(row.getValue() && typeof(row.getValue()) === 'string') {
            const date = new Date(row.getValue() as string);
            return date.toLocaleDateString();
          }
        }
      },
      {
        header: "Max Subject",
        accessorKey: "maxSubjects",
      },
      {
        header: "Phase",
        accessorKey: "phase",
      },
      {
        header: "Pre Screen",
        accessorKey: "preScreen",
        cell: ({ row }) => {
          return <div>{row.original.preScreen ? <Check /> : <Error />}</div>;
        },
      },
      {
        header: "SR.com",
        accessorKey: "sr",
        cell: ({ row }) => {
          return <div>{row.original.sr ? <Check /> : <Error />}</div>;
        },
      },
      {
        header: "Active",
        accessorKey: "active",
        cell: ({ row }) => {
          return <div>{row.original.active ? <Check /> : <Error />}</div>;
        },
      },
      {
        id: "actions",
        header: "Action",
        size: 140,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-6">
              <Link href={`/study/${row.original.studyId}/edit`}><Edit/></Link>
              <DeleteOutlined className="cursor-pointer" onClick={() => onDelete(row.original.studyId)}/>
            </div>
          );
        },
      },
    ]
  );
}
