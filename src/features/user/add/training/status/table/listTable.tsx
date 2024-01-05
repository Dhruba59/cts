"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { getColumns } from "./columns";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useEditUser } from "@/hooks/rq-hooks/user-hooks";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { CompletedTraining } from "../../training";
import { searchByIds } from "../../..";

export const searchTrainingIndexById = (data: CompletedTraining[], id: number) => {
  return data?.findIndex((item: CompletedTraining) => item.userTrainingId == id);
}


export function ListTable({ data, form, setCompletedTrainings }: any) {
  const onDownload = () => {};

  const onOverridenDateChange = useCallback((value: DateValueType, id: number) => {
    const index = searchTrainingIndexById(data, id);

    if(index !== -1){ 
      let newData = JSON.parse(JSON.stringify(data));
      newData[index] = {
        ...data[index],
        dateOfOverridden: value?.startDate?.toLocaleString()
      };
      setCompletedTrainings(newData);
    }
  }, [data, setCompletedTrainings]); 
 

  const onOverrideCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>, id: number) => {
    const index = searchTrainingIndexById(data, id);
    if(index !== -1){ 
      let newData = JSON.parse(JSON.stringify(data));
      newData[index] = {
        ...data[index],
        overridden: e.target.checked
      }
      setCompletedTrainings(newData);
    }
    // const payload = {
    //   userId: id.toString(),
    //   completedTrainingStatus: [
    //     {
    //       userTrainingId: id,
    //       dateOfOverridden: overridenDate?.startDate?.toLocaleString() ?? '',
    //       overridden: e.target.checked
    //     }
    //   ]
    // }

    // editUser(payload, {
    //   onSuccess: (data) => {
    //     toast.success(data?.data.details);
    //     // router.push('user/list');
    //   },
    //   onError: (error: any) => {
    //     toast.error(error.response.data.detail);
    //   }
    // });

  }, [ data, setCompletedTrainings]) 

  const columns: any = useMemo(() => getColumns({ onDownload, onOverridenDateChange, onOverrideCheckboxChange, form }),[ onOverridenDateChange, onOverrideCheckboxChange, form]);

  return (
    <div className="sm:wrapper">
      <h4 className="hidden md:block font-semibold py-4 px-6 text-dark-900">
        Status
      </h4>
      <div className="hidden sm:block">
        <SimpleTable data={data} columns={columns} containerClassName='min-h-[650px]' />
      </div>
      <div className="block sm:hidden">
        <ExpandableTable
          data={data}
          columns={columns}
          tableTitle="List of Training Status"
          listTitleKey="training_status"
        />
      </div>
    </div>
  );
};

export default ListTable;
