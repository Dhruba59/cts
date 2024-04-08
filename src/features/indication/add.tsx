'use client'
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { useAddIndication, useEditIndication, useGetIndicationById, useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { SelectOptionType } from "@/model/drop-down-list";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";
import { IndicationQuery } from "@/model/indication";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { apiResponseToast } from "@/utils/toast";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type AddIndicationProps = {
  id?: string
}
const AddIndication = ({ id }: AddIndicationProps) => {

  const router = useRouter();
  const defaultValues = {
    indicationId: 0,
    indicationName: '',
    code: '',
    codeType: '',
    description: '',
    isRequireDetails: false,
    active: null,
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IndicationQuery>({
    defaultValues: defaultValues
  });


  const { mutate: AddIndication, isLoading: isAddIndicationLoading } = useAddIndication();
  const { mutate: EditIndication, isLoading: isEditIndicationLoading } = useEditIndication();
  const { data: codeTypesDropdown, error, isLoading, refetch } = useGetIndicationCodeTypes();
  const [codeTypes, setCodeTypes] = useState<SelectOptionType[]>([]);
  const { data: indicationData, error: indicationDataError, isLoading: isIndicationDataLoading, refetch: refetchIndicationData
  } = useGetIndicationById(id);

  //console.log(`ID: ${id}`);

  const handleRedirect = () => {
    reset();
    router.push("/indication/list");
  }

  const onSubmit = (payload: any) => {
    payload = {
      ...payload,
      codeType: payload?.codeType?.value ?? payload?.codeType
    }

    if (id) {
      payload = { ...payload };
      EditIndication(payload, {
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
      AddIndication(payload, {
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
    setCodeTypes(convertTypeToSelectOption(codeTypesDropdown?.data?.codeTypes));
  }, [codeTypesDropdown, indicationData])


  useEffect(() => {
    //console.log(indicationData);
    if (indicationData) {
      reset({
        ...indicationData?.data
      });
    }
  }, [indicationData]);

  return (
    <div className="w-full">
      <Breadcrumbs title="Indication" subTitle={id ? "Update" : "Add" } />
      <section className="wrapper">
        <h4 className="px-6 py-4">
          Indication Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <Input
                label="Indication Name"
                placeholder="Enter indication name"
                {...register("indicationName", {
                  required: "Indication name is required!"
                })}
              />
              {errors.indicationName && (
                <span className="text-red-500 -mt-10">{errors.indicationName.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="code"
                placeholder="Enter indication code"
                {...register("code", {
                  required: "Code is required!"
                })}
              />
              {errors.code && (
                <span className="text-red-500 -mt-10">{errors.code.message as string}</span>
              )}
            </div>
            <div>
              <Controller
                control={control}
                name='codeType'
                rules={{
                  required: 'Code type is required!',
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Select onChange={onChange} label="Code type" options={codeTypes} value={value} />
                )}
              />
              {errors.codeType && (
                <span className="text-red-500 -mt-10">{errors.codeType.message as string}</span>
              )}
            </div>
          </div>
          <Textarea label="Description" placeholder="Enter description here"  {...register("description")} />
          <div className="flex flex-row items-center">
            <Controller
              name="isRequireDetails"
              control={control}
              render={({ field: { onChange, onBlur, value } }: any) =>
                <Checkbox className="" onChange={onChange} value={value} checked={value} />}
            />
            <Label label="Require Details" />
          </div>

          <div className="flex justify-center gap-4 mt-8 md:mt-14">
            <Button type="submit" className="px-8" loading={isAddIndicationLoading || isEditIndicationLoading}>Submit</Button>
            <Button className="px-8" variant="outline" onClick={handleRedirect} >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddIndication;
