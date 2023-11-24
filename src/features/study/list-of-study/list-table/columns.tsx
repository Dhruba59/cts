import Check from "@/components/icons/check";
import DeleteOutlined from "@/components/icons/deleteOutlined";
import Edit from "@/components/icons/edit";
import Error from "@/components/icons/error";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { formateTableDate } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

export type List = {
  protocol_number: string;
  study_name: string;
  start_date: string;
  end_date: string;
  max_subject: number;
  phase: string;
  preScreen: boolean;
  sr: boolean;
  active: boolean;
};

// export const LIST_DATA: List[] = [
//   {
//     protocol_number: "PS - Vaccine",
//     study_name: "Vaccine",
//     start_date: formateTableDate(new Date("2022-03-25").toISOString()),
//     end_date: formateTableDate(new Date("2022-11-25").toISOString()),
//     max_subject: 26,
//     phase: "Phase 1",
//     pre_screen: true,
//     sr_com: false,
//     active: true,
//   },
//   {
//     protocol_number: "AXS_05-A0-304",
//     study_name: "AXS_05",
//     start_date: formateTableDate(new Date("2022-02-19").toISOString()),
//     end_date: formateTableDate(new Date("2022-12-19").toISOString()),
//     max_subject: 16,
//     phase: "Phase 1",
//     pre_screen: false,
//     sr_com: true,
//     active: true,
//   },
// ];

export const LIST_COLUMN: ColumnDef<List>[] = [
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
          <Edit />
          <DeleteOutlined />
        </div>
      );
    },
  },
];
