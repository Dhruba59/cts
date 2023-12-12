import { formateTableDate } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import PrintSubjectModal from "../../subject-entry/table/print-subject-modal";

export type List = {
  user_name: string;
  protocol: string;
  subject_id: string;
  first_init: string;
  second_init: string;
  third_init: string;
  dob: string;
  national_id: number;
  id_type: string;
  sex: string;
  zip: number;
  height: number;
  weight: number;
  dateEntered: string;
};

// export const LIST_DATA: List[] = [
//   {
//     user_name: "Steven",
//     protocol: "PS ANX",
//     subject_id: "psx-1234",
//     first_init: "D",
//     second_init: "L",
//     third_init: "F",
//     dob: formateTableDate("05-11-1980"),
//     national_id: 112233,
//     id_type: "Social Security(US)",
//     sex: "M",
//     zip: 14893,
//     height: 170.5,
//     weight: 77,
//     expired_date: formateTableDate("12-12-2022"),
//   },
//   {
//     user_name: "Rogers",
//     protocol: "PS ANX",
//     subject_id: "psx-1234",
//     first_init: "D",
//     second_init: "L",
//     third_init: "F",
//     dob: formateTableDate("05-11-1980"),
//     national_id: 112233,
//     id_type: "Social Security(US)",
//     sex: "M",
//     zip: 14893,
//     height: 170.5,
//     weight: 77,
//     expired_date: formateTableDate("12-12-2022"),
//   },
// ];

export const getColumns = (): ColumnDef<List>[] => { 
  return([

  ]);
}

export const LIST_COLUMN: ColumnDef<List>[] = [
  // {
  //   header: "User Name",
  //   accessorKey: "user_name",
  // },
  {
    header: "Protocol",
    accessorKey: "protocolNumber",
  },
  {
    header: "Subject ID",
    accessorKey: "subjectID",
  },
  {
    header: "1st Init",
    accessorKey: "firstInit",
  },
  {
    header: "2nd Init",
    accessorKey: "middleInit",
  },
  {
    header: "3rd Init",
    accessorKey: "lastInit",
  },

  {
    header: "DOB",
    accessorKey: "dob",
    cell: ({ row }) => {
      return (
        <div>{formateTableDate(row.original.dob)}</div>
      );
    },
  },
  {
    header: "National ID",
    accessorKey: "nationalId",
  },
  {
    header: "ID Type",
    accessorKey: "idType",
  },
  {
    header: "Sex",
    accessorKey: "gender",
  },
  {
    header: "Zip",
    accessorKey: "zipCode"
  },
  {
    header: "Height",
    accessorKey: "height",
  },
  {
    header: "Weight",
    accessorKey: "weight",
  },
  {
    header: "Expired Date",
    accessorKey: "dateEntered",
    cell: ({ row }) => {
      return (
        <div>{formateTableDate(row.original.dateEntered)}</div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    size: 80,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-6">
          <PrintSubjectModal />
        </div>
      );
    },
  },
];
