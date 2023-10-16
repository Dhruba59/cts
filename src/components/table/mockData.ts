import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  age: number;
  country: string;
  phone: string;
};

export const USERS = [
  {
    id: 1,
    first_name: "Dallas",
    last_name: "Geibel",
    email: "dgeibel0@twitter.com",
    gender: "Male",
    date_of_birth: "2/3/2022",
    age: 25,
    country: "Slovenia",
    phone: "2107768258",
  },
  {
    id: 2,
    first_name: "Toby",
    last_name: "Mullineux",
    email: "tmullineux1@sina.com.cn",
    gender: "Male",
    date_of_birth: "3/16/2022",
    age: 47,
    country: "China",
    phone: "5981931450",
  },
  {
    id: 3,
    first_name: "Keen",
    last_name: "Sexten",
    email: "ksexten2@a8.net",
    gender: "Male",
    date_of_birth: "2/2/2022",
    age: 60,
    country: "China",
    phone: "1761395128",
  },
  {
    id: 4,
    first_name: "Shantee",
    last_name: "Conwell",
    email: "sconwell3@intel.com",
    gender: "Female",
    date_of_birth: "4/18/2022",
    age: 34,
    country: "Indonesia",
    phone: "3372973788",
  },
  {
    id: 5,
    first_name: "Meaghan",
    last_name: "Agett",
    email: "magett4@bloglovin.com",
    gender: "Female",
    date_of_birth: "11/17/2021",
    age: 22,
    country: "United States",
    phone: "8161423968",
  },
];

export const USER_COLUMN: ColumnDef<User>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "first_name",
  },
  {
    header: "Last Name",
    accessorKey: "last_name",
  },
  {
    header: "Date of Birth",
    accessorKey: "date_of_birth",
  },
  {
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
];
