'use client'
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import {
  useAddNationalIdType, useEditNationalIdType, useGetNidCountryDropdownOptions, useGetNationalIdTypeById
} from "@/hooks/rq-hooks/national-id-type-hooks";
import { SelectOptionType } from "@/model/drop-down-list";
import { AddNationalIdTypeProps, NationalIdType, NationalIdTypeQuery } from "@/model/national-id-type";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { apiResponseToast } from "@/utils/toast";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { toast } from "react-toastify";


const AddNationalIdType = ({ id }: AddNationalIdTypeProps) => {

  const router = useRouter();

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
  } = useForm<NationalIdType>({
    defaultValues: defaultValues
  });


  const { mutate: AddNationalIdType, isLoading: isAddNationalIdTypeLoading
  } = useAddNationalIdType();
  const { mutate: EditNationalIdType, isLoading: isEditNationalIdTypeLoading
  } = useEditNationalIdType();
  const { data: countryDropdown, error, isLoading, refetch
  } = useGetNidCountryDropdownOptions();
  const [frequencyTypes, setFrequencyTypes] = useState<SelectOptionType[]>([]);

  const { data: nationalIdTypeData, refetch: refetchNationalIdType
  } = useGetNationalIdTypeById(id)

  const handleCancel = () => {
    reset()
    router.push("/national-id-type/list");
  }

  const onSubmit = (payload: any) => {

    payload = {
      ...payload,
      frequencyTypeId: payload?.frequencyTypeId?.value ?? payload?.frequencyTypeId
    }

    if (id) {
      payload = { ...payload };
      EditNationalIdType(payload, {
        onSuccess: ({ data }: any) => {
          const newFieldValues = {
            ...payload
          }
          reset(newFieldValues as any);
          apiResponseToast(data);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.title);
        }
      });
    } else {
      AddNationalIdType(payload, {
        onSuccess: ({ data }: any) => {
          reset();
          apiResponseToast(data);
          refetch();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.title);
        }
      })
    };

  }

  useEffect(() => {
    setFrequencyTypes(convertTypeToSelectOption(countryDropdown?.data?.countries));
  }, [countryDropdown, nationalIdTypeData])


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
      <Breadcrumbs title="NID Type" subTitle="Add NID Type" />
      <section className="wrapper">
        <h4 className="px-6 py-4">
          NID Type Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16">
            <div>
              <Input
                label="NationalID Type"
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
            <Button className="px-8" variant="outline" onClick={handleCancel} >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddNationalIdType;
