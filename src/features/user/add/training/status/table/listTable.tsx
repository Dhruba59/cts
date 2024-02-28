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
import { toast } from "react-toastify";
import Modal from "@/components/modal";
import { getUserTrainingCertificate } from "@/service/user-training-service";
import { useQuery } from "react-query";
import { TrainingCertificateQueryParams } from "@/model/training";
import Spinner from "@/components/ui/spinner";
import { PDFViewer } from "@react-pdf/renderer";
import CertificatePdf from "@/features/taining-material/certificate/pdf";

export const searchTrainingIndexById = (data: CompletedTraining[], id: number) => {
  return data?.findIndex((item: CompletedTraining) => item.userTrainingId == id);
}


export function ListTable({ data, setCompletedTrainings, refetchUser }: any) {

  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [certificateQueryParams, setCertificateQueryParams] =
  useState<TrainingCertificateQueryParams>();
  const form = useForm();
  const { getValues, setError, setValue, clearErrors, reset } = form;
  const { mutate: updateTraining } = useChangeTrainingStatus();

  const { data: certificateData, isLoading: isLoadingCertificate } =
  useQuery({
    queryFn: getUserTrainingCertificate,
    queryKey: ["training-certificate", certificateQueryParams],
    enabled: !!certificateQueryParams,
  });

  const onDownload = (trainingId: number | string) => {
    setCertificateQueryParams({
      TrainingId: trainingId
    });
    setIsCertificateModalOpen(true);
  };

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
        apiResponseToast(data?.data);
        refetchUser();
        clearErrors();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.detail);
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

  const onCloseModal = () => {
    setIsCertificateModalOpen(false);
  };

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
      <Modal
          containerClassName="bg-transparent max-h-full !h-full top-0 max-w-full !w-full"
          closeBtnClassName="bg-white rounded-full hover:scale-125 transition-all duration-200 right-8"
          open={isCertificateModalOpen}
          setOpen={setIsCertificateModalOpen}
          onClose={() => onCloseModal}>
          <div className="h-full w-full mt-6">
            {isLoadingCertificate ? (
              <div className="h-[85vh] flex items-center justify-center">
                <Spinner size="large" />{" "}
              </div>
            ) : (
              <PDFViewer className="w-full h-[85vh]">
                <CertificatePdf
                  data={certificateData?.data}
                />
              </PDFViewer>
            )}
          </div>
        </Modal>
    </div>
  );
};

export default ListTable;
