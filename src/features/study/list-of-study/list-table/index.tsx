"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { Dispatch, SetStateAction, useMemo } from "react";
import { getColumns } from "./columns";
import { SortingState } from "@tanstack/react-table";
import { useGetStudyDelete } from "@/hooks/rq-hooks/study-hooks";
import { toast } from "react-toastify";

export interface ListTableProps {
  data: any;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
}

const ListTable = ({ data, sorting, setSorting }: ListTableProps) => {
  const { mutate: deleteStudy } = useGetStudyDelete();

  const onDelete = (studyId: number) => {
    deleteStudy({ studyId }, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data?.data.details ,{position:"top-center"});
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.title ,{position:"top-center"});
      }
    });
  }
  const columns = useMemo(() => getColumns({ onDelete }), []);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        List of Study
      </h4>
      <div className="w-full block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle=" List of study"
          listTitleKey="protocol_number"
        />
      </div>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} sorting={sorting} setSorting={setSorting} />
      </div>
    </div>
  );
};

export default ListTable;
