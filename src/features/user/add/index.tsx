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
import { useAddIndication, useEditIndication, useGetIndicationById, useGetIndicationCodeTypes } from "@/hooks/rq-hooks/indication-hooks";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
import { Indication, IndicationQuery } from "@/model/indication";
import { getIndicationById, getIndicationCodeTypes } from "@/service/indication-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Tab from "../user-tab";
import { useAddUser, useEditUser, useGetUserById, useGetUserDropdowns, useValidateUserName } from "@/hooks/rq-hooks/user-hooks";
import DragNDrop from "@/components/dnd";
import { DndDataItem, DndDataType } from "@/types/common";
import SiteUserSettings from "./site-user-settings";
import Training, { CompletedTraining, filterDndData } from "./training/training";
import { CompletedTrainingEditableStatus, User } from "@/model/user";
import { toast } from "react-toastify";
import SysAdminUserSettings from "./sys-admin-user-settings";
import SponsorUserSettings from "./sponsor-user-settings";
import { useRouter } from "next/navigation";

interface AddUserProps {
  id?: string;
}

interface AdminDndData {
  matchTypes: DndDataType[];
  sites: DndDataType[];
}

const initialSiteUserDndValue = [{
  title: 'Protocols',
  items: []
},
{
  title: 'selected',
  items: []
}]

export const initialTrainingDndValue = [{
  title: 'Available Training Module',
  items: []
},
{
  title: 'selected',
  items: []
}]

const initialSponsorDndValue = [{
  title: 'Protocols',
  items: []
},
{
  title: 'selected',
  items: []
}]

const initialAdminDndValue = {
  matchTypes: [{
    title: 'Match Type',
    items: []
  },
  {
    title: 'selected',
    items: []
  }],
  sites: [{
    title: 'Site',
    items: []
  },
  {
    title: 'selected',
    items: []
  }]
}

export function searchByIds(list: DndDataItem[], ids: string[]) {
  const resultArray = [];

  for (const id of ids) {
    const foundObject = list?.find(item => item.value == id);

    if (foundObject) {
      resultArray.push(foundObject);
    }
  }

  return resultArray;
}


enum USER_TYPE_ENUM {
  SITE_USER = '1',
  SYS_ADMIN = '4',
  SR_USER_ONLY = '5',
  SPONSOR = '6',
  BOTH_USER_TYPE = '-1'
}

const constructPayload = (values: any, userType: USER_TYPE_ENUM, isUpdate: boolean = false) => {
  // const siteStudyId = values.sites.map((item: DropDownItem) => item.value);
  let payload: User = {
    firstName: values.firstName,
    middleName: values.middleName,
    lastName: values.lastName,
    email: values.email,
    title: values.title,
    address1: values.address1,
    address2: values.address2,
    city: values.city,
    state: values.state,
    zip: values.zip,
    userTypeId: values.userType?.value ?? values.userType,
    sponsorId: values.sponsor.value ?? values.sponsor,
    systemLogin: values.systemLogin
  }

  if (isUpdate) {
    delete payload.systemLogin;
    payload.active = values?.isActive;
  }
  switch (userType) {
    case USER_TYPE_ENUM.SITE_USER:
      payload.protocolIds = values?.protocols?.map((item: DndDataItem) => item.value).join(',');
      payload.siteId = values?.site?.value ?? values?.site ?? undefined;
      payload.suppressMatchTypeId = values?.suppressMatchType?.value ?? values?.suppressMatchType ?? undefined;
      payload.trainings = values?.training?.map((item: any) => ({
        trainingId: item?.value, protocolId: item?.protocolId
      }));
      break;
    case USER_TYPE_ENUM.SR_USER_ONLY:
      payload.protocolIds = values?.protocols?.map((item: DndDataItem) => item.value).join(',');
      payload.siteId = values?.site?.value ?? values?.site ?? undefined;
      payload.suppressMatchTypeId = values?.suppressMatchType?.value ?? values?.suppressMatchType ?? undefined;
      payload.trainings = values?.training?.map((item: any) => ({
        trainingId: item?.value, protocolId: item?.protocolId
      }));
      break;
    case USER_TYPE_ENUM.SYS_ADMIN:
      payload.matchTypeIds = values?.matchTypes?.map((item: DndDataItem) => item.value).join(',');
      payload.notificationSiteIds = values?.notificationSites?.map((item: DndDataItem) => item.value).join(',');
      break;
    case USER_TYPE_ENUM.SPONSOR:
      payload.sponsorProtocols = values?.protocols?.map((item: DndDataItem) => item.value).join(',');
      break;
    case USER_TYPE_ENUM.BOTH_USER_TYPE:
      payload.protocolIds = values?.protocols?.map((item: DndDataItem) => item.value).join(',');
      payload.siteId = values?.site?.value ?? values?.site ?? undefined;
      payload.suppressMatchTypeId = values?.suppressMatchType?.value  ?? values?.suppressMatchType ?? undefined;
      payload.trainings = values?.training?.map((item: any) => ({
        trainingId: item?.protocolId, protocolId: item?.protocolId
      }));
      payload.matchTypeIds = values?.matchTypes?.map((item: DndDataItem) => item.value).join(',');
      payload.notificationSiteIds = values?.notificationSites?.map((item: DndDataItem) => item.value).join(',');
      break;
  }

  return payload;
}

const AddUser = ({ id }: AddUserProps) => {
  const [userTypeOptions, setUserTypeOptions] = useState<SelectOptionType[]>();
  const [sponsorOptions, setSponsorOptions] = useState<SelectOptionType[]>();
  const [selectedProtocols, setSelectedProtocols] = useState<DndDataItem[]>([]);
  const [selectedUserType, setSelectedUserType] = useState<USER_TYPE_ENUM>(USER_TYPE_ENUM.SITE_USER);
  const [selectedSponsorId, setSelectedSponsorId] = useState<string>('');
  const [initialSponsorProtocolIds, setInitialSponsorProtocolIds] = useState<string[]>();
  const [initialSiteProtocolIds, setInitialSiteProtocolIds] = useState<string[]>();
  const [siteUserSiteId, setSiteUserSiteId] = useState<string>();
  const [completedTrainings, setCompletedTrainings] = useState<CompletedTraining[]>([]);
  const { data: dropdowns, isLoading: isDropdownDataLoading } = useGetUserDropdowns();
  const { data: userData, isLoading: isUserDataLoading, refetch: refetchUser } = useGetUserById({ UserId: id! });
  const { mutate: addUser, isLoading: isCreatingUser } = useAddUser();
  const { mutate: editUser, isLoading: isEditingUser } = useEditUser();
  const { mutate: validateUsername } = useValidateUserName();

  const [siteUserDndData, setSiteUserDndData] = useState<DndDataType[]>(initialSiteUserDndValue);
  const [trainingDndData, setTrainingDndData] = useState<DndDataType[]>(initialTrainingDndValue);
  const [sponsorDndData, setSponsorDndData] = useState<DndDataType[]>(initialSponsorDndValue);
  const [adminDndData, setAdminDndData] = useState<AdminDndData>(initialAdminDndValue);
  const router = useRouter();

  const form = useForm();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
    reset,
    watch,
    setError,
    resetField,
  } = form;

  useEffect(() => {
    const user = userData?.data;
    setCompletedTrainings(userData?.data?.completedTrainings);
    if (userData) {
      const values = {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        // sponsor: user.sponsor,
        email: user.email,
        systemLogin: user.systemLogin,
        title: user.title,
        address1: user.address1,
        address2: user.address2,
        city: user.city,
        state: user.state,
        zip: user.zip,
        userType: user.userTypeId,
        sponsor: user.sponsorId,
        suppressMatchType: user.suppressMatchTypeId,
        siteId: user.siteId,
        site: user.siteId,
        isActive: user.active
      }
      reset(values);
      setSelectedUserType(user?.userTypeId.toString());
      if (user.userTypeId == USER_TYPE_ENUM.SITE_USER) {
        // setSiteUserDndData();
        setInitialSiteProtocolIds(user?.protocolIds?.map((id: number) => id.toString()));
        setSiteUserSiteId(user?.siteId);
        const trainings = user?.trainings?.map((item: any) => ({
          value: item?.trainingId, protocolId: item?.protocolId, text: item.trainingName,
        }));
        setValue('training', trainings);
        // setTrainingDndData();
      }
      else if (user.userTypeId == USER_TYPE_ENUM.SYS_ADMIN) {
        const adminMatchTypes = searchByIds(dropdowns?.data?.matchTypes, user?.matchTypeIds);
        const adminNotificationSites = searchByIds(dropdowns?.data?.sites, user?.notificationSiteIds);
        setValue('notificationSites', adminNotificationSites);
        setValue('matchTypes', adminMatchTypes);
      
        setAdminDndData({
          matchTypes: filterDndData([{
            title: 'Match Type',
            items: dropdowns?.data?.matchTypes
          },
          {
            title: 'selected',
            items: adminMatchTypes
          }]),
          sites: filterDndData([{
            title: 'Site',
            items: dropdowns?.data?.sites
          },
          {
            title: 'selected',
            items: adminNotificationSites
          }])
        });
        
      }
      
      else if (user.userTypeId == USER_TYPE_ENUM.SPONSOR) {
        setSelectedSponsorId(user?.sponsorId);
        setInitialSponsorProtocolIds(user?.protocolIds?.map((id: number) => id.toString()));
      }
      else if (user.userTypeId == USER_TYPE_ENUM.BOTH_USER_TYPE) {
        // setSiteUserDndData();
        setInitialSiteProtocolIds(user?.protocolIds?.map((id: number) => id.toString()));
        setSiteUserSiteId(user?.siteId);
        // setTrainingDndData();
        // setAdminDndData();
        const adminMatchTypes = searchByIds(dropdowns?.data?.matchTypes, user?.matchTypeIds);
        const adminNotificationSites = searchByIds(dropdowns?.data?.sites, user?.notificationSiteIds);
        setAdminDndData({
          matchTypes: filterDndData([{
            title: 'Match Type',
            items: dropdowns?.data?.matchTypes
          },
          {
            title: 'selected',
            items: adminMatchTypes
          }]),
          sites: filterDndData([{
            title: 'Site',
            items: dropdowns?.data?.sites
          },
          {
            title: 'selected',
            items: adminNotificationSites
          }])
        });
      }
    }
  }, [userData])

  

  const onSubmit = (values: any) => {
    let payload = constructPayload(values, selectedUserType, !!id);
    if (id) {
      if ((selectedUserType == USER_TYPE_ENUM.SITE_USER)) {
        payload.completedTrainingStatus = completedTrainings?.map((item: CompletedTraining) => ({
          userTrainingId: item.userTrainingId,
          dateOfOverridden: item.dateOfOverridden,
          overridden: item.overridden
        }));
      }
      editUser({ userId: id, ...payload }, {
        onSuccess: (data) => {
          toast.success(data?.data.details);
          router.push('/user/list');
        },
        onError: (error: any) => {
          toast.error(error.response.data.detail);
        }
      });
    }
    else {
      addUser(payload, {
        onSuccess: (data) => {
          toast.success(data?.data.details);
          reset();
          setSiteUserDndData(initialSiteUserDndValue);
          setTrainingDndData(initialTrainingDndValue);
          setSponsorDndData(initialSponsorDndValue);
          setAdminDndData(initialAdminDndValue);
        },
        onError: (error: any) => {
          toast.error(error.response.data.detail);
        }
      });
    }
  };

  const getTabItems = (userType: USER_TYPE_ENUM) => {
    switch (userType) {
      case USER_TYPE_ENUM.SITE_USER:
        return (
          [
            {
              content: <SiteUserSettings
                form={form}
                dndData={siteUserDndData}
                setDndData={setSiteUserDndData}
                sites={dropdowns?.data?.sites}
                suppressMatchTypes={dropdowns?.data?.suppressMatchTypes}
                setSelectedProtocols={setSelectedProtocols}
                initialSiteId={siteUserSiteId}
                initialProtocolsIds={initialSiteProtocolIds}
              />,
              title: 'Site User Settings'
            },
            {
              content: <Training
                form={form}
                dndData={trainingDndData}
                setDndData={setTrainingDndData}
                protocols={selectedProtocols}
                prevTrainings={userData?.data.trainings}
                completedTrainings={userData?.data.completedTrainings}
                setCompletedTrainings={setCompletedTrainings}
                refetchUser={refetchUser} />,
              title: 'Training'
            }
          ]
        );
      case USER_TYPE_ENUM.SYS_ADMIN:
        return ([
          {
            content: <SysAdminUserSettings
              form={form}
              dndData={adminDndData}
              setDndData={setAdminDndData}
              matchTypes={dropdowns?.data?.matchTypes}
              sites={dropdowns?.data?.sites}
            />,
            title: 'SysAdmin User Settings'
          },
        ]
        );

      case USER_TYPE_ENUM.SR_USER_ONLY:
        return ([
          {
            content: <SiteUserSettings
              form={form}
              dndData={siteUserDndData}
              setDndData={setSiteUserDndData}
              sites={dropdowns?.data?.sites}
              suppressMatchTypes={dropdowns?.data?.suppressMatchTypes}
              setSelectedProtocols={setSelectedProtocols}
              initialSiteId={siteUserSiteId}
              initialProtocolsIds={initialSiteProtocolIds}
            />,
            title: 'Site User Settings'
          },
        ]
        );

      case USER_TYPE_ENUM.BOTH_USER_TYPE:
        return ([
          {
            content: <SiteUserSettings
              form={form}
              dndData={siteUserDndData}
              setDndData={setSiteUserDndData}
              sites={dropdowns?.data?.sites}
              suppressMatchTypes={dropdowns?.data?.suppressMatchTypes}
              setSelectedProtocols={setSelectedProtocols}
              initialSiteId={siteUserSiteId}
              initialProtocolsIds={initialSiteProtocolIds}
            />,
            title: 'Site User Settings'
          },
          {
            content: <SysAdminUserSettings
              form={form}
              dndData={adminDndData}
              setDndData={setAdminDndData}
              matchTypes={dropdowns?.data?.matchTypes}
              sites={dropdowns?.data?.sites}
            />,
            title: 'SysAdmin User Settings'
          },
        ]
        );

      case USER_TYPE_ENUM.SPONSOR:
        return ([
          {
            content: <SponsorUserSettings
              form={form}
              dndData={sponsorDndData}
              setDndData={setSponsorDndData}
              sponsorId={selectedSponsorId}
              initialProtocolsIds={initialSponsorProtocolIds}
            />,
            title: 'Sponsor User Settings'
          },
        ]
        );

      default: return (
        [
          {
            content: <SiteUserSettings
              form={form}
              dndData={siteUserDndData}
              setDndData={setSiteUserDndData}
              sites={dropdowns?.data?.sites}
              suppressMatchTypes={dropdowns?.data?.suppressMatchTypes}
              setSelectedProtocols={setSelectedProtocols}
              initialSiteId={siteUserSiteId}
              initialProtocolsIds={initialSiteProtocolIds}
            />,
            title: 'Site User Settings'
          },
          {
            content: <Training
              form={form}
              dndData={trainingDndData}
              setDndData={setTrainingDndData}
              protocols={selectedProtocols}
              prevTrainings={userData?.data.trainings}
              completedTrainings={userData?.data.completedTrainings}
              setCompletedTrainings={setCompletedTrainings}
              refetchUser={refetchUser} />,
            title: 'Training'
          }
        ]
      );
    }
  }

  const handleSystemLoginName = (e: any) => {
    if(id) return;
    const firstName = getValues('firstName');
    const lastName = getValues('lastName');
    if (firstName && lastName && firstName !== '' && lastName !== '') {
      setValue('systemLogin', firstName[0] + lastName);
    }
  };

  // const handleSystemLoginChange = (e: any) => {
  //   console.log(e.target.value);
  // }

  const watchSystemLogin = watch('systemLogin');
  useEffect(() => {
    if (!id) {
      validateUsername({
        username: watchSystemLogin,
      }, {
        onSuccess: (data) => {
          if (data.data.type === 1) {
            setError('systemLogin', { type: 'custom', message: data.data.message });
          }
          else {
            setError('systemLogin', { type: 'error', message: data.data.message });
          }
        }
      });
    }
  }, [watchSystemLogin])

  useEffect(() => {
    if (dropdowns) {
      setUserTypeOptions(convertTypeToSelectOption(dropdowns?.data?.userTypes));
      setSponsorOptions(convertTypeToSelectOption(dropdowns?.data?.sponsors));

      if (!id) {  
        setAdminDndData({
          matchTypes: [{
            title: 'Match Type',
            items: dropdowns?.data?.matchTypes
          },
          {
            title: 'selected',
            items: []
          }],
          sites: [{
            title: 'Site',
            items: dropdowns?.data?.sites
          },
          {
            title: 'selected',
            items: []
          }]
        })
      }
    }
  }, [dropdowns]);


  return (
    <div className="w-full">
      <Breadcrumbs title="User" subTitle="Add User" />
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <section className="wrapper">
          <h4 className=" text-neutral-black px-6 py-4">
            {id ? 'Update User' : 'Create New User'}
          </h4>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-6 py-8">
            <div>
              <Input
                label="First Name"
                placeholder="Enter First name"
                {...register("firstName", {
                  required: "First name is required!"
                })}
                onBlur={handleSystemLoginName}
              />
              {errors.firstName && (
                <span className="text-red-500 -mt-10">{errors.firstName.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Middle Name"
                placeholder="Middle Name"
                {...register("middleName", {
                  // required: "Middle name is required!"
                })}
              />
              {errors.middleName && (
                <span className="text-red-500 -mt-10">{errors.middleName.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Last Name"
                placeholder="Enter last name"
                {...register("lastName", {
                  required: "Last name is required!"
                })}
                onBlur={handleSystemLoginName}
              />
              {errors.lastName && (
                <span className="text-red-500 -mt-10">{errors.lastName.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Title"
                placeholder="Enter Title"
                {...register("title", {
                  // required: "Title is required!"
                })}
              />
              {errors.title && (
                <span className="text-red-500 -mt-10">{errors.title.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="Email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email!"
                  }
                })}
              />
              {errors.email && (
                <span className="text-red-500 -mt-10">{errors.email.message as string}</span>
              )}
            </div>
            <div>
              <Controller
                control={control}
                name='userType'
                rules={{
                  required: 'User type is required!',
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Select
                    onChange={(option) => {
                      onChange(option);
                      setSelectedUserType(option.value);
                    }}
                    label="User type"
                    options={userTypeOptions}
                    value={value} />
                )}
              />
              {errors.userType && (
                <span className="text-red-500 -mt-10">{errors.userType.message as string}</span>
              )}
            </div>
            <div>
              <Controller
                control={control}
                name='sponsor'
                rules={{
                  required: 'Sponsor is required!',
                }}
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Select
                    onChange={(option) => {
                      onChange(option);
                      setSelectedSponsorId(option.value.toString());
                    }}
                    label="Sponsor"
                    options={sponsorOptions}
                    value={value} />
                )}
              />
              {errors.sponsor && (
                <span className="text-red-500 -mt-10">{errors.sponsor.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="System Login"
                placeholder="Enter system login"
                disabled={!!id}
                {...register("systemLogin", {
                  // required: "System login is required!"
                })}
              // onChange={handleSystemLoginChange}
              />
              {errors.systemLogin && (
                <span className={`${errors.systemLogin.type === 'custom' ? 'text-green-500' : 'text-red-500'} -mt-10`}>{errors.systemLogin.message as string}</span>
              )}
            </div>
            <div>
              <Input
                label="City"
                placeholder="Enter City"
                {...register("city", {
                  required: "City is required!"
                })}
              />
              {errors.city && (
                <span className="text-red-500 -mt-10">{errors.city.message as string}</span>
              )}
            </div>
            <Textarea label="Address one" placeholder="Enter description here"  {...register("address1")} className="min-h-10 h-10 rounded-sm" />
            <Textarea label="Address two" placeholder="Enter description here"  {...register("address2")} className="min-h-10 h-10 rounded-sm"/>
            {/* <div className="col-span-full grid grid-cols-1 gap-6 md:grid-cols-2">
              <Textarea label="Address one" placeholder="Enter description here"  {...register("address1")} />
              <Textarea label="Address two" placeholder="Enter description here"  {...register("address2")} />
            </div> */}
            <div>
              <Input
                label="State"
                placeholder="Enter State"
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
                label="Zip Code"
                placeholder="Enter zip code"
                {...register("zip", {
                  required: "Zip code is required!"
                })}
              />
              {errors.zip && (
                <span className="text-red-500 -mt-10">{errors.zip.message as string}</span>
              )}
            </div>
            <div className="flex flex-col items-start justify-between py-1 pb-4">
              <Label label="Is User Active" />
              <Controller
                name="isActive"
                control={control}
                render={({ field: { onChange, onBlur, value } }: any) =>
                  <Checkbox onChange={onChange} checked={id ? value : true} disabled={!id} />}
              />
            </div>
            {/* {id && */}

            {/* <div className="col-span-full grid grid-cols-1 gap-6 md:grid-cols-2">
              <Textarea label="Address one" placeholder="Enter description here"  {...register("address1")} />
              <Textarea label="Address two" placeholder="Enter description here"  {...register("address2")} />
            </div> */}
          </div>
        </section>

        <section className="wrapper space-y-6">
          <Tab tabItems={getTabItems(selectedUserType)} titleClassname="my-2 px-2" />
        </section>
        <div className="flex justify-center gap-4 mt-8 md:mt-14">
          <Button type="submit" className="px-8">Submit</Button>
          <Button className="px-8" variant="outline" onClick={() => { }} disabled={!!id} >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;