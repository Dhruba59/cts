'use client'
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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddIndication = () => {
  const convertTypeToSelectOption = (
    data: DropDownItem[]
  ): SelectOptionType[] =>
    data?.map((item: DropDownItem) => ({
      label: item.text,
      value: item.value
    }));

  const fetchIndicationCodeTypes = async () => {
    const { data, error }: any = await get_indication_code_types();
    setCodeTypes(convertTypeToSelectOption(data.codeTypes));

  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate: AddIndicationMutation, isLoading: isAddIndicationLoading } = useAddIndicationMutation();
  const { data: dropdownList, error, isLoading, refetch } = useGetIndicationCodeTypes();
  const [codeTypes, setCodeTypes] = useState<SelectOptionType[]>([]);
  const [indication, setIndication] = useState<Indication>({
    indicationId: 0,
    isRequireDetails: false,
    indicationName: '',
    code: '',
    codeType: '',
    description: null,
    active: null,
  });

  const onSubmit = (val: any) => {
    console.log(val);
      setIndication((prev) => {
       prev.isRequireDetails = val.isRequireDetails === '' || null || undefined ? null : val.isRequireDetails;
       prev.indicationName = val.indicationName === '' || null || undefined ? null : val.indicationName;
       prev.code = val.code === '' || null || undefined ? null : val.code;
       prev.codeType = val.codeType === undefined ? null : val.codeType.value;
       prev.description = val.description === '' || null || undefined ? null : val.description;
       return prev;
     });  


     AddIndicationMutation(indication, {
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
    fetchIndicationCodeTypes();
  }, [])

  return (
    <MainContainer>
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
                name="codeType"
                control={control}
                rules={{
                  required: "Code type is required!",
                }}
                render={({ field: { onChange, onBlur } }: any) => (
                  <Select onChange={onChange} label="Code Type" options={codeTypes} />
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
            <Button className="px-8" variant="outline" onClick={() => { }}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </MainContainer>
  );
};

export default AddIndication;
