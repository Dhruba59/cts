import Print from "@/components/icons/print";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import { LastSubjectPrintQueryParams } from "@/model/subject";
import { formateTableDate, formateTableDateTime } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

export type List = {
  sponsorSubjectId: number;
  visitTypeName: string;
  dateEntered: string;
  protocolNumber: string;
  dateOfBirth: string;
  firstInitial: string;
  fromDate: string;
  toDate: string;
  lastInitial: string;
  middleInitial: string;
  nationalTypeId: number;
  siteCode: string;
  siteNumber: string;
  studyId: string;
  subjectId: string;
  subjectInitials: string;
  userName: string;
};

interface ColumnsProps {
  onPrintClick: (subjectInfo: LastSubjectPrintQueryParams) => void;
}

export const getColumns = ({ onPrintClick }: ColumnsProps): ColumnDef<List>[] => { 
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
        header: "Sponsor Subject ID",
        accessorKey: "sponsorSubjectId",
        cell: ({ row }) => {
          return (
            <div className=" min-w-[200px]">{row.original.sponsorSubjectId}</div>
          );
        },
      },
      {
        header: "Visit Type",
        accessorKey: "visitTypeName",
        cell: ({ row }) => {
          return (
            <div className=" min-w-[200px]">{row.original.visitTypeName ?? '-'}</div>
          );
        },
      },
      {
        header: "Date Entered",
        accessorKey: "dateEntered",
        cell: ({ row }) => {
          return (
            <div className=" min-w-[200px]">{formateTableDateTime(row.original.dateEntered)}</div>
          );
        },
      },
      {
        header: "Protocol",
        accessorKey: "protocolNumber",
      },
      {
        id: "actions",
        header: "Action",
        size: 100,
        cell: ({ row }) => {
          const subjectInfo: LastSubjectPrintQueryParams = {
            NationalTypeId: row.original.nationalTypeId,
            SponsorSubjectId: row.original.sponsorSubjectId,
            StudyId: row.original.studyId,
            SubjectId: row.original.subjectId,
            UserName: row.original.userName
          } 
          return (
            <div className="flex items-center gap-6">
              <Print onClick={ () => onPrintClick(subjectInfo)}/>
            </div>
          );
        },
      },
    ]
  );
}

// export const LIST_DATA: List[] = [
//   {
//     sponsor_subject_id: 987322,
//     visit_type: "Completed",
//     date_entered: formateTableDate("07-23-2020"),
//     protocol: "PS ANX",
//   },
//   {
//     sponsor_subject_id: 9365213,
//     visit_type: "Completed",
//     date_entered: formateTableDate("06-09-2023"),
//     protocol: "PS DEP",
//   },
// ];

export const LIST_COLUMN: ColumnDef<List>[] = [
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
    header: "Sponsor Subject ID",
    accessorKey: "sponsor_subject_id",
    cell: ({ row }) => {
      return (
        <div className=" min-w-[200px]">{row.original.sponsorSubjectId}</div>
      );
    },
  },
  {
    header: "Visit Type",
    accessorKey: "visit_type",
  },
  {
    header: "Date Entered",
    accessorKey: "date_entered",
  },
  {
    header: "Protocol",
    accessorKey: "protocol",
  },
  {
    id: "actions",
    header: "Action",
    size: 100,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-6">
          <Print />
        </div>
      );
    },
  },
];
