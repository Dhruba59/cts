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
import { useAddSponsor, useEditSponsor } from "@/hooks/rq-hooks/sponsor-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Indication, IndicationQuery } from "@/model/indication";
import { AddSponsorProps, SponsorQuery } from "@/model/sponsor";
import { getSponsorById } from "@/service/sponsor-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { number } from "yup";


const AddSponsor = ({ id }: AddSponsorProps) => {

  const defaultValues = {
    sponsorId: 0,
    sponsorName: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    zip: '',
    state: '',
    active: null
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SponsorQuery>({
    defaultValues: defaultValues
  });


  const { mutate: AddIndication, isLoading: isAddIndicationLoading } = useAddSponsor();
  const { mutate: EditIndication, isLoading: isEditIndicationLoading } = useEditSponsor();
  const [codeTypes, setCodeTypes] = useState<SelectOptionType[]>([]);

  const { data: sponsorData } = useQuery({
    queryFn: getSponsorById,
    queryKey: ['sponsor', { sponsorId: id }],
    enabled: !!id
  });

  const handleCancel = () => {
    if (!id) {
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
      payload = { ...payload };
      EditIndication(payload, {
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
      AddIndication(payload, {
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
    if (sponsorData) {
      reset({
        ...sponsorData?.data
      });
    }
  }, [sponsorData]);

  return (
    <div className="w-full">
      <Breadcrumbs title="SponsorData" subTitle="Add SponsorData" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">
          SponsorData Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            <div>
              <Input
                label="SponsorName Name"
                placeholder="Enter sponsor name"
                {...register("sponsorName", {
                  required: "Sponsor name is required!"
                })}
              />
              {errors.sponsorName && (
                <span className="text-red-500 -mt-10">{errors.sponsorName.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="city"
                placeholder="Enter city"
                {...register("city", {
                  required: "City is required!"
                })}
              />
              {errors.city && (
                <span className="text-red-500 -mt-10">{errors.city.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="State"
                placeholder="Enter state"
                {...register("state", {
                  required: "State is required!"
                })}
              />
              {errors.state && (
                <span className="text-red-500 -mt-10">{errors.state.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Zip"
                placeholder="Enter zip"
                {...register("zip", {
                  required: "Zip is required!"
                })}
              />
              {errors.zip && (
                <span className="text-red-500 -mt-10">{errors.zip.message as string}</span>
              )}
            </div>
            <div>
              <Textarea label="Address One" placeholder="Enter address one"  {...register("address1",{
                required: "Address one is required!"
              })} />
              {errors.address1 && (
                <span className="text-red-500 -mt-10">{errors.address1.message as string}</span>
              )}
            </div>
            <div>
              <Textarea label="Address Two" placeholder="Enter address two"  {...register("address2")} />
            </div>
            <div>
              <Textarea label="Address Three" placeholder="Enter address three"  {...register("address3")} />
            </div>
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

export default AddSponsor;
