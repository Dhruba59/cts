import { formateTableDate } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import PrintSubjectModal from "../../subject-entry/table/print-subject-modal";
import Print from "@/components/icons/print";

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

interface ReportReprintColumnProps {
  onPrintClick: () => void;
}

export const getColumns = ({ onPrintClick }: ReportReprintColumnProps): ColumnDef<List>[] => { 
  return([
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
            <Print onClick={onPrintClick} />
          </div>
        );
      },
    },
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
