import Edit from "@/components/icons/edit";
import Print from "@/components/icons/print";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useGetVisitTypes, useUpdateVisitInfo } from "@/hooks/rq-hooks/subject-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { apiResponseToast } from "@/utils/toast";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LastSubjectContactModal = ({ data, studyId, onUpdateSubject, onHideDetail }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const [visitTypeOptions, setVisitTypeOptions] = useState<SelectOptionType[]>([]);
  const { data: visitTypes, error, isLoading: visitLoading, refetch } = useGetVisitTypes();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const { mutate: updateVisitInfo, isLoading:isUpdatingVisitInfo} = useUpdateVisitInfo();

  useEffect(() => {
    const date = new Date();
    setValue('lastSubjectEntryDate', {
      startDate: date ,
      endDate: date 
    })
  }, [])

  useEffect(() => {
    setVisitTypeOptions(convertTypeToSelectOption(visitTypes?.data as any));
  }, [visitTypes]);

  const onHandelReset = async () => {
    setIsLoading(true);
    setOpen(false);
    onHideDetail();
    reset();
    reset({
      lastSubjectEntryDate: {
        startDate: new Date(),
        endDate: new Date()
      }
    })
  }

  const onSubmit = async (values: any) => {
    const payload = {
      studyId: studyId,
      protocolNumber: data.protocolNumber,
      sponsorSubjectId: data.sponsorSubjectID,
      subjectId: data.subjectID,
      nationalTypeId: data.nationalTypeID,
      visitTypeId: values.visitType.value,
      lastSubjectEntryDate: values.lastSubjectEntryDate.startDate
    };
    updateVisitInfo(payload, {
      onSuccess: (response) => {
        apiResponseToast(response.data);
        setOpen(false);
        onHideDetail();
        onUpdateSubject(data);
      },
      onError: (error: any) => {
        toast.error(error.response.data.detail);
      }
    })
  };
  return (
    <Modal
      title="Select Visit Type and Submit"
      renderFooter={{
        onSave: handleSubmit(onSubmit),
        submitButtonName: "Submit",
        cancelButtonName: "Cancel",
      }}
      open={open}
      setOpen={setOpen}
      onClose={() => onHandelReset()}
      isLoading={isUpdatingVisitInfo}
    >
      <form className="space-y-3 px-6 py-2 sm:space-y-6 sm:h-80">
        <div className="w-full mx-auto flex flex-col justify-start items-start sm:flex-row sm:justify-center sm:items-center gap-2">
          <Label className="w-full sm:w-40 sm:text-right" label="Protocol No:" />
          <Input
            wrapperClassName="w-full sm:w-[280px]"
            placeholder="Enter protocol no."
            value={data.protocolNumber}
            disabled
          />
        </div>
        <div className="w-full mx-auto flex flex-col justify-start items-start sm:flex-row sm:justify-center sm:items-center gap-2">
          <Label className="w-40 sm:text-right" label="Sponsor Subject ID:" />
          <Input
            placeholder="Enter subject id"
            wrapperClassName="w-full sm:w-[280px]"
            value={data.sponsorSubjectID}
            disabled
          />
        </div>
        <div className="w-full mx-auto flex flex-col justify-start items-start sm:flex-row sm:justify-center sm:items-center gap-2">
          <Label className="w-40 sm:text-right" label="Visit Type:" />
          <div className="w-full sm:w-[280px] flex flex-col gap-2">
            <Controller
              control={control}
              name='visitType'
              rules={{
                required: 'Visit Type is required!',
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select
                  // wrapperClassName="w-full sm:w-[280px]"
                  onChange={onChange}
                  options={visitTypeOptions}
                  value={value}
                />
              )}
            />
            <div>
              {errors.visitType && (
                <span className="text-red-500 -mt-10">{errors.visitType.message as string}</span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full mx-auto flex flex-col justify-start items-start sm:flex-row sm:justify-center sm:items-center gap-2">
          <Label className="w-full sm:w-40 sm:text-right" label="Last Subject Entry Date:" />
          <div className="w-full sm:w-[280px] flex flex-col gap-2">
          <Controller
            control={control}
            name='lastSubjectEntryDate'
            rules={{}}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Datepicker
                popoverDirection='down'
                value={value}
                asSingle
                // containerClassName="w-full sm:w-[280px]"
                useRange={false}
                onChange={onChange}
                placeholder="Start Date"
                maxDate={new Date()}
              />
            )}
          />
            <div>
              {errors.lastSubjectEntryDate && (
                <span className="text-red-500 -mt-10">{errors.lastSubjectEntryDate.message as string}</span>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default LastSubjectContactModal;
