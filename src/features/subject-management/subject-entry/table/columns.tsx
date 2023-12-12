import { ColumnDef } from "@tanstack/react-table";
import PrintSubjectModal from "./print-subject-modal";
import { formateTableDate } from "@/utils/helpers";

export type List = {
  // user_name: string;
  // protocol: string;
  // subject_id: string;
  // first_init: string;
  // second_init: string;
  // third_init: string;
  // dob: string;
  // national_id: number;
  // id_type: string;
  // sex: string;
  // zip: number;
  // height: number;
  // weight: number;
  // expired_date: string;

  userId: number,
  subjectID: string,
  sponsorSubjectID: string,
  isPartialDate: true,
  dob: string,
  gender: string,
  social: string,
  firstInit: string,
  secondInit: string,
  thirdInit: string,
  nationalTypeID: 0,
  screenedDate: string,
  zipcode: string,
  height: number,
  weight: number,
  dateEntered: string,
  siteStudyID: number,
  protocolNumber: string,
  indicationDetail: string,
  userName: string,
  active: true
};

export const getColumns = (): ColumnDef<List>[] => {

  return(
    [
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
        accessorKey: "sponsorSubjectID",
      },
      {
        header: "1st Init",
        accessorKey: "firstInit",
      },
      {
        header: "2nd Init",
        accessorKey: "secondInit",
      },
      {
        header: "3rd Init",
        accessorKey: "thirdInit",
      },
    
      {
        header: "DOB",
        accessorKey: "dob",
      },
      {
        header: "National ID",
        accessorKey: "national_id",
      },
      {
        header: "ID Type",
        accessorKey: "nationalTypeID",
      },
      {
        header: "Sex",
        accessorKey: "gender",
      },
      {
        header: "Zip",
        accessorKey: "zipcode",
      },
      {
        header: "Height",
        accessorKey: "height",
      },
      {
        header: "Weight",
        accessorKey: "weight",
      },
      // {
      //   header: "Expired Date",
      //   accessorKey: "expired_date",
      // },
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
    ]
  );
}



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

export const LIST_COLUMN: ColumnDef<List>[] = [
  {
    header: "User Name",
    accessorKey: "user_name",
  },
  {
    header: "Protocol",
    accessorKey: "protocol",
  },
  {
    header: "Subject ID",
    accessorKey: "subject_id",
  },
  {
    header: "1st Init",
    accessorKey: "first_init",
  },
  {
    header: "2nd Init",
    accessorKey: "second_init",
  },
  {
    header: "3rd Init",
    accessorKey: "third_init",
  },

  {
    header: "DOB",
    accessorKey: "dob",
  },
  {
    header: "National ID",
    accessorKey: "national_id",
  },
  {
    header: "ID Type",
    accessorKey: "id_type",
  },
  {
    header: "Sex",
    accessorKey: "sex",
  },
  {
    header: "Zip",
    accessorKey: "zip",
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
    accessorKey: "expired_date",
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
