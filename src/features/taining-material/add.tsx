"use client";

import { MainContainer } from "@/components/style-container";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import {
  useAddTrainingMaterial,
  useEditTrainingMaterial,
  useGetTrainingMaterialById,
  useGetStudyProtocols,
} from "@/hooks/rq-hooks/training-material-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import {
  AddTrainingMaterialProps,
  TrainingMaterial,
  TrainingMaterialQuery,
} from "@/model/training-material";
import {
  getTrainingMaterialById,
  getStudyProtocols,
} from "@/service/training-material-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { number } from "yup";
import { useRouter } from 'next/navigation';

const AddTrainingMaterial = ({ id }: AddTrainingMaterialProps) => {
  const router = useRouter();

  const defaultValues: TrainingMaterialQuery = {
    studyId: null,
    trainingId: 0,
    trainingName: "",
    passMarks: 0,
    displayOrder: 0,
    materialId: 0,
    fileName: "",
    filePath: "",
    preScreen: undefined,
    active: undefined,
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TrainingMaterialQuery>({
    defaultValues: defaultValues,
  });

  const {
    mutate: AddTrainingMaterial,
    isLoading: isAddTrainingMaterialLoading,
  } = useAddTrainingMaterial();
  const {
    mutate: EditTrainingMaterial,
    isLoading: isEditTrainingMaterialLoading,
  } = useEditTrainingMaterial();
  const {
    data: studyProtocolsDropdown,
    error,
    isLoading,
    refetch,
  } = useGetStudyProtocols();
  const [studyProtocols, setStudyProtocols] = useState<SelectOptionType[]>([]);
  const {
    data: trainingMaterialData,
    error: trainingMaterialDataError,
    isLoading: isTrainingMaterialDataLoading,
    refetch: refetchTrainingMaterialData,
  } = useGetTrainingMaterialById(id);

  const handleCancel = () => {
      reset();
      router.push("/training-material/list");
  };

  const onSubmit = (payload: any) => {
    //console.log(payload);

    payload = {
      ...payload,
      studyId: payload?.studyId?.value ?? payload?.studyId,
    };

    if (id) {
      payload = { ...payload };
      EditTrainingMaterial(payload, {
        onSuccess: ({ data }: any) => {
          const newFieldValues = {
            ...payload,
          };
          reset(newFieldValues as any);
          toast.success(data.message, { position: "top-center" });
        },
        onError: (err: any) => {
          toast.warn(err?.response?.data?.title, { position: "top-center" });
        },
      });
    } else {
      AddTrainingMaterial(payload, {
        onSuccess: ({ data }: any) => {
          reset();
          toast.success(data.message, { position: "top-center" });
          refetch();
        },
        onError: (err: any) => {
          toast.warn(err?.response?.data?.title, { position: "top-center" });
        },
      });
    }
  };

  useEffect(() => {
    setStudyProtocols(
      convertTypeToSelectOption(studyProtocolsDropdown?.data?.studyProtocols)
    );
  }, [studyProtocolsDropdown, trainingMaterialData]);

  useEffect(() => {
    console.log(trainingMaterialData);
    if (trainingMaterialData) {
      reset({
        ...trainingMaterialData?.data,
      });
    }
  }, [trainingMaterialData]);

  return (
    <div className="w-full">
      <Breadcrumbs title="Training Material" subTitle="Add Training Material" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">
          Training Material Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-6 gap-4 lg:gap-6">
            <div className="col-span-6 md:col-span-3 xl:col-span-2" >
              <Input
                label="Training Name"
                disabled
                placeholder="Enter Name"
                {...register("trainingName", {
                  required: "Pass Mark is required!",
                })}
              />
              {errors.trainingName && (
                <span className="text-red-500 -mt-10">
                  {errors.trainingName.message as string}
                </span>
              )}
            </div>
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <Controller
                control={control}
                name="studyId"
                rules={{
                  required: "Protocol is required!",
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Select
                    onChange={(option) => {
                      onChange(option);
                      setValue('trainingName', option.label)
                    }}
                    isDisabled={!!id}
                    label="Protocol"
                    options={studyProtocols}
                    value={value}
                  />
                )}
              />
              {errors.studyId && (
                <span className="text-red-500 -mt-10">
                  {errors.studyId.message as string}
                </span>
              )}
            </div>
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <Input
                label="Pass Mark"
                placeholder="Enter Pass Mark"
                type="number"
                {...register("passMarks", {
                  required: "Pass Mark is required!",
                })}
              />
              {errors.passMarks && (
                <span className="text-red-500 -mt-10">
                  {errors.passMarks.message as string}
                </span>
              )}
            </div>
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <Input
                label="Display Order"
                placeholder="Enter display order"
                type="number"
                {...register("displayOrder", {
                  required: "Display order is required!",
                })}
              />
              {errors.passMarks && (
                <span className="text-red-500 -mt-10">
                  {errors.passMarks.message as string}
                </span>
              )}
            </div>
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <Input
                label="File Name"
                placeholder="Enter file name"
                {...register("fileName", {
                  required: "File name is required!",
                })}
              />
              {errors.passMarks && (
                <span className="text-red-500 -mt-10">
                  {errors.passMarks.message as string}
                </span>
              )}
            </div>
            <div className="col-span-6 md:col-span-3 xl:col-span-2">
              <Input
                label="File Path"
                placeholder="Enter file path"
                {...register("filePath", {
                  required: "Pass Mark is required!",
                })}
              />
              {errors.passMarks && (
                <span className="text-red-500 -mt-10">
                  {errors.passMarks.message as string}
                </span>
              )}
            </div>
            {/* <div className="flex flex-row items-center sm:col-span-1 md:col-span-2">
              <Controller
                name="preScreen"
                control={control}
                render={({ field: { onChange, onBlur, value } }: any) =>
                  <Checkbox className="" onChange={onChange} value={value} checked={value} />}
              />
              <Label label="Pre-Screen" />
            </div> */}
          </div>

          <div className="flex justify-center gap-4 mt-8 md:mt-14">
            <Button type="submit" className="px-8">
              Submit
            </Button>
            <Button
              className="px-8"
              variant="outline"
              onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTrainingMaterial;
