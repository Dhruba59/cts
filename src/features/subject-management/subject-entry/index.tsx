'use client';

import Breadcrumbs from "@/components/ui/breadcrumbs";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import SubjectEntrySelectionTab from "./subject-tab/subject-entry-selection-tab";
import ListTable from "./table/list-table";
import { Controller, useForm } from "react-hook-form";
import { SelectOptionType } from "@/model/drop-down-list";
import { useQuery } from "react-query";
import { getProtocolsByStudyId, getStudyType, getSubjectDropdowns, searchLastSubjects } from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { Protocol, SearchLastSubjectsParams } from "@/model/subject";

const getProtocolsDropdown = (data: Protocol[]) => {
  return data?.map((protocol) => ({ value: protocol.studyId.toString(), label: protocol.protocolNumber }))
}

const initialQueryParams: SearchLastSubjectsParams = {
  StudyId: '',
  SponsorSubjectId: '',
  DateOfBirth: '',
  FirstInitial: '',
  MiddleInitial: '',
  LastInitial: '',
  FromDate: '',
  ToDate: ''
}

const SubjectEntryForm = () => {
  const [studyTypeOptions, setStudyTypeOptions] = useState<SelectOptionType[]>([]);
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>([]);
  const [selectedProtocol, setSelectedProtocol] = useState<SelectOptionType>();
  const [selectedStudy, setSelectedStudy] = useState<SelectOptionType>();
  const [queryParams, setQueryParams] = useState<SearchLastSubjectsParams>(null!);
  const [currentTab, setCurrentTab] = useState<"add" | "last">("add");
  const [isPreScreen, setIsPreScreen] = useState<boolean>(false);
  const [subjectEntryFormat, setSubjectEntryFormat] = useState<string>('');

  const { data: studyTypeData } = useQuery('studyType', {
    queryFn: getStudyType,
  });

  const { data: subjectList, isLoading: isSubjectLoading } = useQuery({
    queryFn: searchLastSubjects,
    queryKey: ['subjectEntry', queryParams]
  });

  const { data: protocolList } = useQuery({
    queryFn: getProtocolsByStudyId,
    queryKey: ['protocolList', { StudyType: selectedStudy?.value }],
    enabled: !!selectedStudy
  });

  const { data: dropdowns } = useQuery('subjectDropdowns', {
    queryFn: getSubjectDropdowns,
  });

  const getSubjectIdFormatFromProtocol = (id: string) => {
    const protocol = protocolList?.data?.protocols.find((item: any) => item.studyId.toString() === id)
    if(protocol) {
      return protocol.subjectIdEntryFormat;
    }
  }

  useEffect(() => {
    setStudyTypeOptions(convertTypeToSelectOption(studyTypeData?.data?.studyTypes));
  }, [studyTypeData]);

  useEffect(() => {
    if (studyTypeOptions?.[0])
      setSelectedStudy(studyTypeOptions[0]);
  }, [studyTypeOptions]);


  useEffect(() => {
    setProtocolOptions(getProtocolsDropdown(protocolList?.data?.protocols));
  }, [protocolList]);

  // useEffect(() => {
  //   if(protocolOptions?.[0])
  //     setSelectedProtocol(protocolOptions[0]);
  // }, [protocolOptions]);

  useEffect(() => {

    const prescreen = protocolList?.data?.protocols
      ?.find(({ studyId }: any) => studyId.toString() === selectedProtocol?.value)
      ?.isPreScreen;
    setIsPreScreen(prescreen);

    // set query param
    const params: SearchLastSubjectsParams = {
      StudyId: selectedProtocol?.value,
      // SponsorSubjectId: values.sponsorSubjectID,
      // DateOfBirth: values?.DateOfBirth?.startDate,
      // FirstInitial: values.FirstInitial,
      // MiddleInitial: values.MiddleInitial,
      // LastInitial: values.LastInitial,
      // FromDate: values.FromDate?.startDate,
      // ToDate: values.ToDate?.startDate
    }

    if (!prescreen) {
      setQueryParams(params);
    }

  }, [selectedProtocol]);

  useEffect(() => {
    if(selectedProtocol){
      setSubjectEntryFormat(getSubjectIdFormatFromProtocol(selectedProtocol?.value));
    };
  }, [selectedProtocol]);

  console.log(protocolOptions);
  return (
    <main>
      <Breadcrumbs title="Subject Management" subTitle="Entry Study Subject" />
      <div className="wrapper" >
        <h4 className=" text-neutral-black px-6 py-4">Subject Entry</h4>
        <hr />
        <div className="w-full px-6 py-8">
          <div className="flex gap-x-10 justify-between">
            <div className="flex gap-2 md:items-center flex-col md:flex-row w-full">
              <Label
                label="Study Type"
                className="text-sm md:text-base mr-2 md:font-medium w-32"
              />
              <Select
                wrapperClassName="w-full"
                onChange={(option) => {
                  if (option) {
                    setSelectedStudy(option);
                    setSelectedProtocol(null!);
                  }
                }}
                value={selectedStudy}
                options={studyTypeOptions}
              />
            </div>
            <div className="flex gap-2 md:items-center flex-col md:flex-row md:col-span-2 w-full">
              <Label
                label="Select a protocol"
                className="text-sm md:text-base mr-2 md:font-medium w-44"
              />
              <Select
                wrapperClassName="w-full"
                onChange={(option) => {
                  if (option) {
                    setSelectedProtocol(option);
                  }
                }}
                value={selectedProtocol}
                options={protocolOptions}
              />
            </div>
          </div>
          <SubjectEntrySelectionTab currentTab={currentTab} setCurrentTab={setCurrentTab} isPreScreen={isPreScreen} subjectEntryFormat={subjectEntryFormat} protocolId={selectedProtocol?.value} setQueryParams={setQueryParams} dropdowns={dropdowns?.data || []} />
        </div>
      </div>
      {
        currentTab === "last" && (
          <ListTable data={subjectList?.data} isLoading={isSubjectLoading} protocolId={selectedProtocol?.value}/>
        )
      }

    </main>
  );
};

export default SubjectEntryForm;
