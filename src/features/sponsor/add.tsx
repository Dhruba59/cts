'use client'
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useAddSponsor, useEditSponsor } from "@/hooks/rq-hooks/sponsor-hooks";
import { SelectOptionType } from "@/model/drop-down-list";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";
import { AddSponsorProps, Sponsor, SponsorQuery } from "@/model/sponsor";
import { getSponsorById } from "@/service/sponsor-service";
import { apiResponseToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

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
const AddSponsor = ({ id }: AddSponsorProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Sponsor>({
    defaultValues: defaultValues
  });

  const { mutate: AddIndication, isLoading: isAddIndicationLoading } = useAddSponsor();
  const { mutate: EditIndication, isLoading: isEditIndicationLoading } = useEditSponsor();

  const { data: sponsorData } = useQuery({
    queryFn: getSponsorById,
    queryKey: ['sponsor', { sponsorId: id }],
    enabled: !!id
  });

  const handleCancel = () => {
    reset();
    router.push("/sponsor/list");
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
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.title);
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
        <h4 className="px-6 py-4">
          Sponsor Information
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
            <Button className="px-8" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddSponsor;
