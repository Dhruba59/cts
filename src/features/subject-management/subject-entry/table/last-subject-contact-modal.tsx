import Edit from "@/components/icons/edit";
import Print from "@/components/icons/print";
import Modal from "@/components/modal";
import Datepicker from "@/components/ui/datepicker";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useGetVisitTypes, useUpdateVisitInfo } from "@/hooks/rq-hooks/subject-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { convertTypeToSelectOption } from "@/utils/helpers";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LastSubjectContactModal = ({ data, studyId, onUpdateSubject }: any) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const [visitType, setVisitType] = useState<SelectOptionType>();
  let currentDate = new Date().toJSON().slice(0, 10); // "2022-06-17"
  const [visitTypeOptions, setVisitTypeOptions] = useState<SelectOptionType[]>([]);
  // const [lastSubjectEntryDate, setLastSubjectEntryDate] = useState<string>(currentDate);
  const { data: visitTypes, error, isLoading: visitLoading, refetch } = useGetVisitTypes();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: updateVisitInfo, isLoading:isUpdatingVisitInfo} = useUpdateVisitInfo();

  useEffect(() => {
    const date = new Date();
    console.log(date);
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
    // setLastSubjectEntryDate(currentDate);
    reset();
    reset({
      lastSubjectEntryDate: {
        startDate: null,
        endDate: null
      }
    })
  }

  const onSubmit = async (values: any) => {
    console.log(values);
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
        toast.success(response.data.details);
        setOpen(false);
        onUpdateSubject(data);
      },
      onError: (error: any) => {
        toast.error(error.response.data.detail);
      }
    })
    // setIsLoading(true);
    // setOpen(false);
    // setLastSubjectEntryDate(currentDate);
    // reset();
    

    // mutate(data, {
    //   onSuccess: ({ data }: any) => {
    //     reset();
    //     setOpen(false);
    //     toast.success(data?.message, { position: "top-center" });
    //   },
    //   onError: (err: any) => {
    //     toast.warn(err?.response.data?.title, { position: "top-center" });
    //   },
    //   onSettled: () => {
    //     setIsLoading(false);
    //   }
    // });
  };
  return (
    <Modal
      triggerProp={<Edit />}
      title="Select Visit Type and Submit"
      renderFooter={{
        onSave: handleSubmit(onSubmit),
        submitButtonName: "Submit",
        cancelButtonName: "Cancel",
      }}
      open={open}
      setOpen={setOpen}
      onClose={() => onHandelReset()}
    >
      <form className="space-y-6 h-80">
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Protocol No:" />
          <Input
            placeholder="Enter protocol no."
            className="w-[200px] md:w-[280px]"
            value={data.protocolNumber}
            disabled
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Sponsor Subject ID:" />
          <Input
            placeholder="Enter subject id"
            className="w-[200px] md:w-[280px]"
            value={data.sponsorSubjectID}
            disabled
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Visit Type:" />
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name='visitType'
              rules={{
                required: 'Visit Type is required!',
              }}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Select
                  wrapperClassName="w-[200px] md:w-[280px]"
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
        <div className="flex items-center justify-center gap-2">
          <Label className="w-40 text-right" label="Last Subject Entry Date:" />
          <div className="flex flex-col gap-2">
          <Controller
            control={control}
            name='lastSubjectEntryDate'
            rules={{
              // required: "Date is required!",
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Datepicker
                popoverDirection='down'
                value={value}
                asSingle
                containerClassName="w-[200px] md:w-[280px]"
                useRange={false}
                onChange={onChange}
                placeholder="Start Date"
                maxDate={new Date()}
              />
            )}
          />
            {/* <Input
              {...register('lastSubjectEntryDate', { required: "Last Subject Entry Date is required." })}
              name="lastSubjectEntryDate"
              type="text"
              placeholder="Start Date"
              className="w-[200px] md:w-[280px]"
              onChange={(e) => setLastSubjectEntryDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={lastSubjectEntryDate}

            /> */}
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
