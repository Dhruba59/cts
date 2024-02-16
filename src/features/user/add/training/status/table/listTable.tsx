"use client";
import ExpandableTable from "@/components/table/expandableTable";
import SimpleTable from "@/components/table/simpleTable";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { getColumns } from "./columns";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useChangeTrainingStatus, useEditUser } from "@/hooks/rq-hooks/user-hooks";
import { CompletedTraining } from "../../training";
import { ChangeTrainingStatusPayload } from "@/model/user";
import { useForm } from "react-hook-form";
import { apiResponseToast } from "@/utils/toast";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";

export const searchTrainingIndexById = (data: CompletedTraining[], id: number) => {
  return data?.findIndex((item: CompletedTraining) => item.userTrainingId == id);
}


export function ListTable({ data, setCompletedTrainings, refetchUser }: any) {

  const form = useForm();
  const { getValues, setError, setValue, clearErrors, reset } = form;
  const { mutate: updateTraining } = useChangeTrainingStatus();
  const onDownload = () => {};

  const onUpdateTraining = (row: any, checked: boolean) => {
    console.log(getValues(`overriddenDate${row.original.userTrainingId}`));
    if(getValues(`overriddenDate${row.original.userTrainingId}`) === undefined && checked) {
        setError(`overriddenDate${row.original.userTrainingId}`, { type: 'error', message: 'Select Date!'});
        setValue(`isOverridden${row.original.userTrainingId}`, false);
        return;
    }
    let payload: ChangeTrainingStatusPayload = {
      dateOfOverride: getValues(`overriddenDate${row.original.userTrainingId}`)?.startDate,
      override: false,
      restart: true,
      userTrainingId: row.original.userTrainingId
    }
    if(checked) {
      payload.override = true,
      payload.restart = false
    } else if(!checked) {
      setValue(`overriddenDate${row.original.userTrainingId}`, null);
    }
    updateTraining(payload, {
      onSuccess: (data) => {
        apiResponseToast(data?.data?.message, data?.data?.type);
        refetchUser();
        clearErrors();
      },
      onError: (err: any) => {
        apiResponseToast(err?.response?.data?.detail, RESPONSE_TYPE_ENUM.ERROR);
      }
    });
  }

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

  // const columns: any = useMemo(() => getColumns({ onDownload, onOverridenDateChange, onOverrideCheckboxChange, form }),[ onOverridenDateChange, onOverrideCheckboxChange, form]);

  const columns: any = getColumns({ onDownload, onUpdateTraining, form });

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
