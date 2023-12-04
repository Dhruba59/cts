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
import { useAddNationalIdType, useEditNationalIdType, useGetFrequencyTypes 
} from "@/hooks/rq-hooks/national-id-type-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { AddNationalIdTypeProps, NationalIdType, NationalIdTypeQuery } from "@/model/national-id-type";
import { getIndicationById, getIndicationCodeTypes } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { number } from "yup";


const AddNationalIdType = ({ id }: AddNationalIdTypeProps) => {

  const defaultValues = {
    nationalTypeId: 0,
    nationalIdtypeName: '',
    description: '',
    frequencyTypeId: 0,
    active: undefined,
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<NationalIdTypeQuery>({
    defaultValues: defaultValues
  });


  const { mutate: AddNationalIdType, isLoading: isAddNationalIdTypeLoading 
  } = useAddNationalIdType();
  const { mutate: EditNationalIdType, isLoading: isEditNationalIdTypeLoading 
  } = useEditNationalIdType();
  const { data: frequencyTypesDropdown, error, isLoading, refetch 
  } = useGetFrequencyTypes();
  const [frequencyTypes, setFrequencyTypes] = useState<SelectOptionType[]>([]);

  const { data: nationalIdTypeData } = useQuery({
    queryFn: getIndicationById,
    queryKey: ['NationalIdType', { nationalTypeId: id }],
    enabled: !!id
  });

  const handleCancel = () => {
    if(!id) {
      reset();
      refetch();
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
      EditNationalIdType(payload, {
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
      AddNationalIdType(payload, {
        onSuccess: ({ data }: any) => {
          reset();
          toast.success(data.message, { position: "top-center" });
          refetch();
        },
        onError: (err: any) => {
          toast.warn(err?.response?.data?.title, { position: "top-center" });
        }
      })
    };

  }

  useEffect(() => {
    setFrequencyTypes(convertTypeToSelectOption(frequencyTypesDropdown?.data?.codeTypes));
  }, [frequencyTypesDropdown, nationalIdTypeData])


  useEffect(() => {
    //console.log(indicationData);
    if (nationalIdTypeData) {
      reset({
        ...nationalIdTypeData?.data
      });
    }
  }, [nationalIdTypeData]);

  return (
    <div className="w-full">
      <Breadcrumbs title="NationalID Type" subTitle="Add NationalID Type" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">
        NationalID Type Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16">
            <div>
              <Input
                label="nationalIdtypeName"
                placeholder="Enter nationalID type name"
                {...register("nationalIdtypeName", {
                  required: "NationalID type name is required!"
                })}
              />
              {errors.nationalIdtypeName && (
                <span className="text-red-500 -mt-10">{errors.nationalIdtypeName.message as string}</span>
              )}
            </div>
            <div>
              <Controller
                control={control}
                name='frequencyTypeId'
                rules={{
                  required: 'Country is required!',
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Select onChange={onChange} label="Country" options={frequencyTypes} value={value} />
                )}
              />
              {errors.frequencyTypeId && (
                <span className="text-red-500 -mt-10">{errors.frequencyTypeId.message as string}</span>
              )}
            </div>
          </div>
          <Textarea label="Description" placeholder="Enter description here"  {...register("description")} />

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

export default AddNationalIdType;
