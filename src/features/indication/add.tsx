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
import { useAddIndicationMutation, useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Indication } from "@/model/indication";
import { get_indication_code_types } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddIndication = () => {

  const defaultValues = {
    indicationId: 0,
    isRequireDetails: null,
    indicationName: '',
    code: '',
    codeType: '',
    description: '',
    active: null,
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Indication>({
    defaultValues: defaultValues
  });
  const { mutate: AddIndicationMutation, isLoading: isAddIndicationLoading } = useAddIndicationMutation();
  const { data: codeTypesDropdown, error, isLoading, refetch } = useGetIndicationCodeTypes();
  const [codeTypes, setCodeTypes] = useState<SelectOptionType[]>([]);


  const onSubmit = (val: any) => {

    const params = {
      ...val,
      codeType: val?.codeType?.value
    }
    // setIndication((prev) => {
    //   prev.isRequireDetails = val.isRequireDetails === '' || null || undefined ? null : val.isRequireDetails;
    //   prev.indicationName = val.indicationName === '' || null || undefined ? null : val.indicationName;
    //   prev.code = val.code === '' || null || undefined ? null : val.code;
    //   prev.codeType = val.codeType === undefined ? null : val.codeType.value;
    //   prev.description = val.description === '' || null || undefined ? null : val.description;
    //   return prev;
    // });


    AddIndicationMutation(params, {
      onSuccess: ({ data }: any) => {
        reset();
        toast.success(data.message, { position: "top-center" });
        refetch();
      },
      onError: (err: any) => {
        toast.warn(err?.response?.data?.title, { position: "top-center" });
      }
    });

  }

  useEffect(() => {
    setCodeTypes(convertTypeToSelectOption(codeTypesDropdown?.data?.codeTypes));
  }, [codeTypesDropdown])

  return (
    <div className="w-full">
      <Breadcrumbs title="Indication" subTitle="Add Indication" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">
          Indication Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16">
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
                <Checkbox className="" onChange={onChange} />}
            />
            <Label label="Require Details" />
          </div>

          <div className="flex justify-center gap-4 mt-8 md:mt-14">
            <Button type="submit" className="px-8">Submit</Button>
            <Button className="px-8" variant="outline" onClick={() => { reset() }}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddIndication;
