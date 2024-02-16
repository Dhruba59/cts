'use client'
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import {
  useAddSite, useEditSite, useGetFrequencyTypes, useGetSiteById
} from "@/hooks/rq-hooks/site-hooks";
import { SelectOptionType } from "@/model/drop-down-list";
import { AddSiteProps, SiteQuery } from "@/model/site";
import { convertTypeToSelectOption } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { apiResponseToast } from "@/utils/toast";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";

const AddSite = ({ id }: AddSiteProps) => {
  const router = useRouter();
  const defaultValues = {
    siteId: 0,
    siteName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    siteNumber: '',
    siteZip: '',
    siteCode: '',
    sponsorId: 0,
    frequencyTypeId: 0,
    regionGroup: '',
    primaryContactPhone: '',
    primaryContactName: '',
    primaryContactEmail: '',
    locationId: '',
    piname: '',
    partialDateAllowed: false,
    active: undefined,
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SiteQuery>({
    defaultValues: defaultValues
  });


  const { mutate: AddSite, isLoading: isAddSiteLoading
  } = useAddSite();
  const { mutate: EditSite, isLoading: isEditSiteLoading } = useEditSite();
  const { data: frequencyTypesDropdown, error, isLoading, refetch } = useGetFrequencyTypes();
  const [frequencyTypes, setFrequencyTypes] = useState<SelectOptionType[]>([]);
  const [regionGroup, setRegionGroup] = useState<any[]>([]);
  const { data: siteData } = useGetSiteById(id)

  const frequencyTypeIdField = useWatch({
    control,
    name: 'frequencyTypeId'
  });

  const handleCancel = () => {
    reset();
    router.push("/site/list");
  }

  useEffect(() => {
    fillupRegionGroupField(frequencyTypeIdField);
  }, [frequencyTypeIdField])

  const fillupRegionGroupField = (data: any) => {
    let country = isNaN(data) ? data.value : data.toString();

    const region = regionGroup
      .find(({ countryId }) => countryId === country);

    setValue('regionGroup', region?.regionGroup)
  }

  const onSubmit = (payload: any) => {
    payload = {
      ...payload,
      frequencyTypeId: payload?.frequencyTypeId?.value ?? payload?.frequencyTypeId
    }


    if (id) {
      payload = { ...payload };
      EditSite(payload, {
        onSuccess: ({ data }: any) => {
          const newFieldValues = {
            ...payload
          }
          reset(newFieldValues as any);
          apiResponseToast(data?.message, data?.type);
        },
        onError: (err: any) => {
          apiResponseToast(err?.response?.data?.title, RESPONSE_TYPE_ENUM.ERROR);
        }
      });
    } else {
      AddSite(payload, {
        onSuccess: ({ data }: any) => {
          reset();
          apiResponseToast(data?.message, data?.type);
          refetch();
        },
        onError: (err: any) => {
          apiResponseToast(err?.response?.data?.title, RESPONSE_TYPE_ENUM.ERROR);
        }
      })
    };

  }

  useEffect(() => {
    setFrequencyTypes(convertTypeToSelectOption(frequencyTypesDropdown?.data?.countries));
    setRegionGroup(frequencyTypesDropdown?.data?.regionGroups);
  }, [frequencyTypesDropdown])


  useEffect(() => {
    if (siteData) {
      reset({
        ...siteData?.data
      });
    }
  }, [siteData]);

  return (
    <div className="w-full">
      <Breadcrumbs title="Site" subTitle="Add Site" />
      <section className="wrapper">
        <h4 className=" text-neutral-black px-6 py-4">
          Site Information
        </h4>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            <div>
              <Input
                label="Site Name"
                placeholder="Enter site name"
                {...register("siteName", {
                  required: "Site name is required!"
                })}
              />
              {errors.siteName && (
                <span className="text-red-500 -mt-10">{errors.siteName.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Site Code"
                placeholder="Enter site code"
                {...register("siteCode", {
                  required: "Site code is required!"
                })}
              />
              {errors.siteCode && (
                <span className="text-red-500 -mt-10">{errors.siteCode.message as string}</span>
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
            <div>
              <Input
                label="Region Group"
                disabled
                {...register("regionGroup")}
              />
            </div>
            <div>
              <Input
                label="City"
                placeholder="Enter city code"
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
                placeholder="Enter state code"
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
                placeholder="Enter zip code"
                {...register("siteZip", {
                  required: "Zip is required!"
                })}
              />
              {errors.siteZip && (
                <span className="text-red-500 -mt-10">{errors.siteZip.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Address one"
                placeholder="Enter address one code"
                {...register("address1", {
                  required: "Address one is required!"
                })}
              />
              {errors.address1 && (
                <span className="text-red-500 -mt-10">{errors.address1.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Address two"
                placeholder="Enter address two code"
                {...register("address2", {
                  required: "Address two is required!"
                })}
              />
              {errors.address2 && (
                <span className="text-red-500 -mt-10">{errors.address2.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Primary Contact Phone"
                placeholder="Enter primary contact phone"
                {...register("primaryContactPhone", {
                  required: "Primary contact phone is required!"
                })}
              />
              {errors.primaryContactPhone && (
                <span className="text-red-500 -mt-10">{errors.primaryContactPhone.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Primary Contact Name"
                placeholder="Enter primary contact name"
                {...register("primaryContactName", {
                  required: "Primary contact name is required!"
                })}
              />
              {errors.primaryContactName && (
                <span className="text-red-500 -mt-10">{errors.primaryContactName.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Primary Contact Email"
                placeholder="Enter primary contact email"
                {...register("primaryContactEmail", {
                  required: "Primary contact email is required!"
                })}
              />
              {errors.primaryContactEmail && (
                <span className="text-red-500 -mt-10">{errors.primaryContactEmail.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Location ID"
                placeholder="Enter LocationID"
                {...register("locationId", {
                  required: "LocationID is required!"
                })}
              />
              {errors.locationId && (
                <span className="text-red-500 -mt-10">{errors.locationId.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="PI Name"
                placeholder="Enter PI name"
                {...register("piname", {
                  required: "PI name is required!"
                })}
              />
              {errors.piname && (
                <span className="text-red-500 -mt-10">{errors.piname.message as string}</span>
              )}
            </div>
            <div className="flex flex-row items-center">
              <Controller
                name="partialDateAllowed"
                control={control}
                render={({ field: { onChange, onBlur, value } }: any) =>
                  <Checkbox className="" onChange={onChange} value={value} checked={value}></Checkbox>}
              />
              <Label label="Partial Date Allowed" />
            </div>
          </div>
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

export default AddSite;


