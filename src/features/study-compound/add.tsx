'use client'
import { IndicationIcon } from "@/assets/icons";
import { MainContainer } from "@/components/style-container";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { useAddStudyCompound, useEditStudyCompound, useGetStudyCompoundById } from "@/hooks/rq-hooks/study-compound-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { StudyCompound, StudyCompoundQuery } from "@/model/study-compound";
import { AddStudyCompoundProps } from "@/model/study-compound";
import { getStudyCompoundById } from "@/service/study-compound-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { number } from "yup";


const AddStudyCompound = ({ id }: AddStudyCompoundProps) => {

  const defaultValues = {
    studyCompoundId: 0,
    studyCompoundName: '',
    description: '',
    active: undefined
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<StudyCompoundQuery>({
    defaultValues: defaultValues
  });


  const { mutate: AddStudyCompound, isLoading: isAddStudyCompoundLoading } = useAddStudyCompound();
  const { mutate: EditStudyCompound, isLoading: isEditIndicationLoading } = useEditStudyCompound();

  const { data: studyCompoundData } = useGetStudyCompoundById(id);
  // const { data: studyCompoundData } = useQuery({
  //   queryFn: getStudyCompoundById,
  //   queryKey: ['studyCompound', { StudyCompoundId: id }],
  //   enabled: !!id
  // });

  const handleCancel = () => {
    if(!id) {
      reset();
    }
  }

  const onSubmit = (payload: any) => {

    //console.log(payload);

    payload = {
      ...payload,
      codeType: payload?.codeType?.value ?? payload?.codeType
    }

    if (id) {
      payload = { ...payload};
      EditStudyCompound(payload, {
        onSuccess: ({ data }: any) => {
          const newFieldValues = {
            ...payload
          }
          reset(newFieldValues as any);
          toast.success(data.message, { position: "top-center" });
        },
        onError: (err: any) => {
          toast.warn(err?.response?.data?.title, { position: "top-center" });
        }
      });
    } else {
      AddStudyCompound(payload, {
        onSuccess: ({ data }: any) => {
          reset();
          toast.success(data.message, { position: "top-center" });
        },
        onError: (err: any) => {
          toast.warn(err?.response?.data?.title, { position: "top-center" });
        }
      })
    };

  }


  useEffect(() => {
    //console.log(indicationData);
    if (studyCompoundData) {
      reset({
        ...studyCompoundData?.data
      });
    }
  }, [studyCompoundData]);

  return (
    <div className="w-full">
      <Breadcrumbs title="Study Compound" subTitle="Add Study Compound" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">
        Study Compound Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <Input
                label="CompoundNa Name"
                placeholder="Enter indication name"
                {...register("studyCompoundName", {
                  required: "Compound name is required!"
                })}
              />
              {errors.studyCompoundName && (
                <span className="text-red-500 -mt-10">{errors.studyCompoundName.message as string}</span>
              )}
            </div>
          </div>
          <Textarea label="Description" placeholder="Enter description here"  {...register("description")} />
          <div className="flex flex-row items-center">
            <Controller
              name="active"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) =>
                <Checkbox className="" onChange={onChange} value={value} checked={value}/>}
            />
            <Label label="Active" />
          </div>

          <div className="flex justify-center gap-4 mt-8 md:mt-14">
            <Button type="submit" className="px-8">Submit</Button>
            <Button className="px-8" variant="outline" onClick={handleCancel} disabled={!!id} >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddStudyCompound;
