'use client';
import React, { useEffect, useState } from "react";
import BasicInformation from "./basic-information";
import AssignSite from "./assign-site";
import CriticalSetup from "./critical-setup";
import Button from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form"
import { DndDataType } from "@/types/common";
import { useAddStudyMutation, useGetStudyDropdownsList } from "@/hooks/rq-hooks/study-hooks";
import { DropDownItem } from "@/model/drop-down-list";
import { toast } from "react-toastify";
import { AddStudyPayload, CriticalDataType, CriticalDndDataType, CriticalDndItem } from "@/model/study";
import { getUpdatedCriticalDndData, getUpdatedDndData, initialAssignedData, initialCriticalDndData } from "@/utils/study";
import { MainContainer } from "@/components/style-container";

const initialFormValues ={
  phase: '',
  active: false,
  studyCommentType: '',
  sr: false,
  studyCompound: '',
  sponsor: '',
  preScreen: false,
  date: {
    startDate: null,
    endDate: null
  }
}

interface AddStudyProps {
  id?: string;
}

const AddStudy = ({ id }: AddStudyProps) => {
  const [assignedData, setAssignedData] = useState<DndDataType[]>(initialAssignedData);
  const [criticalDndData, setCriticalDndData] = useState<CriticalDndDataType[]>(initialCriticalDndData);
  const {data: dropdownList, error, isLoading, refetch} = useGetStudyDropdownsList();
  const { mutate: AddStudyMutation, isLoading: isAddStudyLoading } = useAddStudyMutation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
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
    let payload: AddStudyPayload = {
      protocolNumber: val.protocolNumber,
      studyName: val.studyName,
      studyStartDate: new Date(val.date.startDate).toISOString(),
      studyEndDate:new Date(val.date.endDate).toISOString(),
      maxSubjects: val.maxSubjects,
      sponsorId: val.sponsor.value,
      studyType: val.study_id_format,
      phase: val.phase.value,
      preScreen: val.preScreen,
      active: val.active,
      studyCommentType: val.studyCommentType.value,
      // subjectIdentryFormat
      sr: val.sr,
      studyCompound: val.studyCompound.value,
      dslsp: val.dslsp,
      minBmi: val.minBmi,
      maxBmi: val.maxBmi,
      minAge: val.minAge,
      maxAge: val.maxAge,
      assignedSites: getIdsFromDndData(assignedData,'Selected'),
      inclusionCriteria: getCriticalIdsFromDndData(criticalDndData ,'Inclusion Criteria'),
      exclusionCriteria: getCriticalIdsFromDndData(criticalDndData ,'Exclusion Criteria'),
    }

    AddStudyMutation(payload, {
      onSuccess: ({ data }: any) => {
        reset();
        toast.success(data.message, { position: "top-center" });
        refetch();
        setAssignedData(initialAssignedData);
        setCriticalDndData(initialCriticalDndData);
      },
      onError: (err: any) => {
        toast.warn(err?.response?.data?.title, { position: "top-center" });
      }
    });
  }

  useEffect(() => {
    setCriticalDndData((data) => getUpdatedCriticalDndData(data, 'Indications', 'items', dropdownList?.data?.indications));
    setAssignedData((data) => getUpdatedDndData(data, 'Sites', 'items', dropdownList?.data?.sites));
  }, [dropdownList]);

  return (
    < >
      <form className="mb-20 w-full" onSubmit={handleSubmit(onSubmit)}>
        <BasicInformation dropdownList={dropdownList?.data} register={register} setValue={setValue} errors={errors} Controller={Controller} control={control}/>
        <AssignSite assignedData={assignedData} setAssignedData={setAssignedData} />
        <CriticalSetup errors={errors} criticalSetupData={criticalDndData} setCriticalSetupData={setCriticalDndData} Controller={Controller} control={control} register={register}/>
        <div className="flex items-center justify-center gap-4 mt-16">
          <Button className="px-8" type="submit" loading={isAddStudyLoading}>Submit</Button>
          <Button variant="outline" className="px-8">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddStudy;
