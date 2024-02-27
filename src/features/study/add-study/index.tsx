'use client';
import React, { useEffect, useState } from "react";
import BasicInformation from "./basic-information";
import AssignSite from "./assign-site";
import CriticalSetup from "./critical-setup";
import Button from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form"
import { DndDataType } from "@/types/common";
import { useAddStudyMutation, useGetStudyDropdownsList, useUpdateStudyMutation } from "@/hooks/rq-hooks/study-hooks";
import { DropDownItem } from "@/model/drop-down-list";
import { AddUpdateStudyPayload, CriticalDndDataType, CriticalDndItem } from "@/model/study";
import { getUpdatedCriticalDndData, getUpdatedDndData, initialAssignedData, initialCriticalDndData, initialFormValues } from "@/utils/study";
import { MainContainer } from "@/components/style-container";
import { useQuery } from "react-query";
import { getStudiyById } from "@/service/study-service";
import { calculateDaysBetweenDates } from "@/utils/helpers";
import { useRouter } from 'next/navigation';
import { apiResponseToast } from "@/utils/toast";
import { RESPONSE_TYPE_ENUM } from "@/model/enum";
import { toast } from "react-toastify";
interface AddStudyProps {
  id?: string;
}

const AddStudy = ({ id }: AddStudyProps) => {
  const router = useRouter();
  const [assignedData, setAssignedData] = useState<DndDataType[]>(initialAssignedData);
  const [criticalDndData, setCriticalDndData] = useState<CriticalDndDataType[]>(initialCriticalDndData);
  const [isPreScreen, setIsPreScreen] = useState<boolean>(false);
  const { data: dropdownList, error, isLoading, refetch } = useGetStudyDropdownsList();
  const { mutate: AddStudyMutation, isLoading: isAddStudyLoading } = useAddStudyMutation();
  const { mutate: UpdateStudyMutation, isLoading: isUpdateStudyLoading } = useUpdateStudyMutation();

  const { data: studyData } = useQuery({
    queryFn: getStudiyById,
    queryKey: ['study', { StudyId: id }],
    enabled: !!id
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: initialFormValues
  });

  const getIdsFromDndData = (data: DndDataType[], title: string): number[] | [] => (
    data.flatMap((group) => {
      if (group.title === title) {
        return group.items.map((item: DropDownItem) => parseInt(item.value));
      }
      return [];
    }) || []
  );

  const getCriticalIdsFromDndData = (data: CriticalDndDataType[], title: string): number[] | [] => (
    data.flatMap((group) => {
      if (group.title === title) {
        return group.items.map((item: CriticalDndItem) => parseInt(item.value));
      }
      return [];
    }) || []
  );

  const onSubmit = (val: any) => {
    let payload: AddUpdateStudyPayload = {
      subjectIdentryFormat: val.subjectIdentryFormat,
      protocolNumber: val.protocolNumber,
      studyName: val.studyName,
      studyStartDate: new Date(val.date.startDate).toISOString(),
      studyEndDate: new Date(val.date.endDate).toISOString(),
      maxSubjects: val.maxSubjects,
      sponsorId: val.sponsor.value ?? val.sponsor,
      phase: val.phase.value ?? val.phase,
      preScreen: val.preScreen,
      active: val.active,
      studyCommentType: val.studyCommentType.value ?? val.studyCommentType,
      sr: val.sr,
      studyCompound: val.studyCompound.value ?? val.studyCompound,
      dslsp: val.dslsp,
      minBmi: val.minBmi,
      maxBmi: val.maxBmi,
      minAge: val.minAge,
      maxAge: val.maxAge,
      assignedSites: getIdsFromDndData(assignedData, 'Selected'),
      inclusionCriteria: getCriticalIdsFromDndData(criticalDndData, 'Inclusion Criteria'),
      exclusionCriteria: getCriticalIdsFromDndData(criticalDndData, 'Exclusion Criteria'),
    }

    if (id) {
      payload = { ...payload, studyId: parseInt(id) };
      UpdateStudyMutation(payload, {
        onSuccess: ({ data }: any) => {
          const newFieldValues = {
            ...payload,
            sponsor: payload.sponsorId,
            date: {
              startDate: new Date(payload.studyStartDate),
              endDate: new Date(payload.studyEndDate)
            }
          }
          reset(newFieldValues as any);
            apiResponseToast(data);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.title);
        }
      });
    } else {
      AddStudyMutation(payload, {
        onSuccess: ({ data }: any) => {
          reset(initialFormValues);
          setAssignedData(initialAssignedData);
          setCriticalDndData(initialCriticalDndData);
          setIsPreScreen(false);
          refetch();
          apiResponseToast(data);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.title);
        }
      });
    }
  }

  const handleCancel = () => {
      reset();
      setAssignedData(initialAssignedData);
      setCriticalDndData(initialCriticalDndData);
      //refetch();
      router.push("/study/list");
  }

  useEffect(() => {
    if(isPreScreen) {
      clearErrors('subjectIdentryFormat');
    }
  },[isPreScreen]);

  useEffect(() => {
    setCriticalDndData((data) => getUpdatedCriticalDndData(data, 'Indications', 'items', dropdownList?.data?.indications));
    setIsPreScreen(studyData?.data?.preScreen);
    
    let selectedSites: any = [];
    setAssignedData((data) => getUpdatedDndData(data, 'Sites', 'items', dropdownList?.data?.sites));
    if (studyData) {
      studyData?.data?.assignedSites?.map((value: string) => {
        dropdownList?.data?.sites?.forEach((item: any) => {
          if (item.value.toString() === value.toString()) {
            selectedSites.push(item);
          };
        });
      });
      setAssignedData((data) => getUpdatedDndData(data, 'Selected', 'items', selectedSites));

      let inclusionCriteria: any = [];
      studyData?.data?.inclusionCriteria?.map((value: string) => {
        dropdownList?.data?.indications?.forEach((item: any) => {
          if (item.value.toString() === value.toString()) {
            inclusionCriteria.push(item);
          };
        });
      });
      setCriticalDndData((data) => getUpdatedCriticalDndData(data, 'Inclusion Criteria', 'items', inclusionCriteria));

      let exclusionCriteria: any = [];
      studyData?.data?.exclusionCriteria?.map((value: string) => {
        dropdownList?.data?.indications?.forEach((item: any) => {
          if (item.value.toString() === value.toString()) {
            exclusionCriteria.push(item);
          };
        });
      });
      setCriticalDndData((data) => getUpdatedCriticalDndData(data, 'Exclusion Criteria', 'items', exclusionCriteria));
      setCriticalDndData((data: CriticalDndDataType[]) => {
        //removing duplicate from the indication box
        return data?.map((group: CriticalDndDataType) => {
          if (group?.title === 'Indications') {
            const inclusionItems = data?.find(g => g.title === 'Inclusion Criteria')?.items ?? [];
            const exclusionItems = data?.find(g => g.title === 'Exclusion Criteria')?.items ?? [];
            const filteredData = data[1]?.items?.filter(item => {
              return !inclusionItems?.some(i => i.value === item.value) &&
                !exclusionItems?.some(i => i.value === item.value);
            });
            return {
              ...group,
              items: filteredData,
            };
          }
          return group;
        });
      });
    }
  }, [dropdownList, studyData]);


  useEffect(() => {
    if (studyData) {
      reset({
        ...studyData?.data,
        sponsor: studyData?.data?.sponsorId,
        date: {
          startDate: new Date(studyData?.data.studyStartDate),
          endDate: new Date(studyData?.data.studyEndDate)
        },
        study_duration: calculateDaysBetweenDates(studyData?.data.studyStartDate, studyData?.data.studyEndDate) || 0
      });
      
    }
  }, [studyData]);

  return (
    <>
      <form className="mb-20 w-full" onSubmit={handleSubmit(onSubmit)}>
        <BasicInformation dropdownList={dropdownList?.data} register={register} setValue={setValue} errors={errors} Controller={Controller} control={control} isPreScreen={isPreScreen} setIsPreScreen={setIsPreScreen} />
        <AssignSite assignedData={assignedData} setAssignedData={setAssignedData} />
        <CriticalSetup errors={errors} criticalSetupData={criticalDndData} setCriticalSetupData={setCriticalDndData} Controller={Controller} control={control} register={register}/>
        <div className="flex items-center justify-center gap-4 mt-16">
          <Button className="px-8" type="submit" loading={isAddStudyLoading || isUpdateStudyLoading}>Submit</Button>
          <Button variant="outline" className="px-8" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddStudy;
