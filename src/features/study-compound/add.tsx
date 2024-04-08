'use client'
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { useAddStudyCompound, useEditStudyCompound, useGetStudyCompoundById } from "@/hooks/rq-hooks/study-compound-hooks";
import { StudyCompoundQuery } from "@/model/study-compound";
import { AddStudyCompoundProps } from "@/model/study-compound";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { apiResponseToast } from "@/utils/toast";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";
import { toast } from "react-toastify";

const AddStudyCompound = ({ id }: AddStudyCompoundProps) => {
  const router = useRouter();
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
    formState: { errors },
    reset,
  } = useForm<StudyCompoundQuery>({
    defaultValues: defaultValues
  });


  const { mutate: AddStudyCompound, isLoading: isAddStudyCompoundLoading } = useAddStudyCompound();
  const { mutate: EditStudyCompound, isLoading: isEditStudyCompoundLoading } = useEditStudyCompound();

  const { data: studyCompoundData } = useGetStudyCompoundById(id);
  // const { data: studyCompoundData } = useQuery({
  //   queryFn: getStudyCompoundById,
  //   queryKey: ['studyCompound', { StudyCompoundId: id }],
  //   enabled: !!id
  // });

  const handleRedirect = () => {
      reset();
      router.push("/study-compound/list");
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
          apiResponseToast(data);
          handleRedirect();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.title);
        }
      });
    } else {
      AddStudyCompound(payload, {
        onSuccess: ({ data }: any) => {
          reset();
          apiResponseToast(data);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.title);
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
      <Breadcrumbs title="Study Compound" subTitle={id ? "Update" : "Add" } />
      <section className="wrapper">
        <h4 className="px-6 py-4">
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
            <Button type="submit" className="px-8" loading={isAddStudyCompoundLoading || isEditStudyCompoundLoading}>Submit</Button>
            <Button className="px-8" variant="outline" onClick={handleRedirect}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddStudyCompound;
