'use client';

import Breadcrumbs from "@/components/ui/breadcrumbs";
import Select from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import SubjectEntrySelectionTab from "./subject-tab/subject-entry-selection-tab";
import ListTable from "./table/list-table";
import { SelectOptionType } from "@/model/drop-down-list";
import { QueryClient, useQuery } from "react-query";
import { getProtocolsByStudyId, getStudyType, getSubjectDropdowns, searchLastSubjects } from "@/service/subject-service";
import { convertTypeToSelectOption } from "@/utils/helpers";
import { Protocol, SearchLastSubjectsParams, SubjectEntryEditForm } from "@/model/subject";
import { useSession } from "next-auth/react";
import { USER_ROLE_ENUM } from "@/model/enum";
import AddSubjectForm from "./subject-tab/add-subject-form";
import SearchSubjectForm from "./subject-tab/search-subject-form";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import Pagination from "@/components/pagination";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import useProtocolListStore from "@/store";
import { SortingState } from "@tanstack/react-table";

const getProtocolsDropdown = (data: Protocol[]) => {
  return data?.map((protocol) => ({ value: protocol.studyId.toString(), label: protocol.protocolNumber }))
}

export const getSiteStudyIdByStudyId = (data: any, studyId: number | string) => {
  return data?.find((item: any) => item?.studyId == studyId)?.siteStudyId ?? '';
}

const SubjectEntryEditForm = ({ ids }: SubjectEntryEditForm) => {
  const [studyTypeOptions, setStudyTypeOptions] = useState<SelectOptionType[]>([]);
  const [protocolOptions, setProtocolOptions] = useState<SelectOptionType[]>([]);
  const [selectedProtocol, setSelectedProtocol] = useState<SelectOptionType>();
  const [selectedStudy, setSelectedStudy] = useState<SelectOptionType>();
  const [userId, setUserId] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [queryParams, setQueryParams] = useState<SearchLastSubjectsParams>(null!);
  const [currentTab, setCurrentTab] = useState<"add" | "last">("add");
  const [isPreScreen, setIsPreScreen] = useState<boolean>(false);
  const [subjectEntryFormat, setSubjectEntryFormat] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: session } = useSession();
  const router = useRouter();

  // @ts-ignore
  const userRole = session?.user?.currentRole?.roleId;

  const { data: studyTypeData } = useQuery('studyType', {
    queryFn: getStudyType,
  });

  const { data: subjectList, isLoading: isSubjectLoading, isRefetching: isRefetchingSubject, refetch } = useQuery({
    queryFn: searchLastSubjects,
    queryKey: ['last_subjects', queryParams],
    enabled: userRole == USER_ROLE_ENUM.SYSTEM_ADMIN && !!selectedProtocol
  });

  const { data: protocolList } = useQuery({
    queryFn: getProtocolsByStudyId,
    queryKey: ['protocolList', { StudyType: selectedStudy?.value, UserId: userId }],
    enabled: !!selectedStudy
  });

  const { data: dropdowns } = useQuery('subjectDropdowns', {
    queryFn: getSubjectDropdowns,
  });

  //const { protocols, addProtocols } = useProtocolListStore();

  const restSubjectIdFormat = (id: string) => {
    const protocol = protocolList?.data?.protocols.find((item: any) => item.studyId === id)
    if (protocol) {
      setSubjectEntryFormat(protocol?.subjectIdEntryFormat ?? '');
    }
  };

  const setCurrentPageNumber = (page: number) => {
    setQueryParams((data: any) => {
      if (data) {
        return {
          ...data,
          PageNumber: page
        }
      } else {
        return { PageNumber: page };
      }
    });
  };

  useEffect(() => {
    setStudyTypeOptions(convertTypeToSelectOption(studyTypeData?.data?.studyTypes));
  }, [studyTypeData]);

  useEffect(() => {
    if(!ids) {
      if(userRole == USER_ROLE_ENUM.SYSTEM_ADMIN) {
        setSelectedStudy(studyTypeOptions[2] ?? '');
      } else {
        setSelectedStudy(studyTypeOptions[0] ?? '');
      }
    }
  }, [studyTypeOptions, ids]);


  useEffect(() => {
    setProtocolOptions(getProtocolsDropdown(protocolList?.data?.protocols));
    //addProtocols(protocolList?.data?.protocols);
  }, [protocolList]);

  // useEffect(() => {
  //   if(protocolOptions?.[0])
  //     setSelectedProtocol(protocolOptions[0]);
  // }, [protocolOptions]);

  // useEffect(() => {
  //   const prescreen = protocolList?.data?.protocols?.find(
  //     ({ studyId }: any) => studyId.toString() === selectedProtocol?.value
  //   )?.isPreScreen;
  //   setIsPreScreen(prescreen);

  //   // set query param
  //   if (!prescreen) {
  //     setQueryParams({ StudyId: selectedProtocol?.value });
  //   }
  // }, [selectedProtocol]);

  const queryClient = new QueryClient();

  const onUpdateSubject = () => {
    // const params = {... queryParams};
    // queryClient.invalidateQueries()
// Invalidate every query with a key that starts with `todos`
    // queryClient.invalidateQueries({ queryKey: ['last_subjects'] });
    // setQueryParams(params);
    refetch();
  }

  useEffect(() => {
    if (selectedProtocol) {
      const protocol = protocolList?.data?.protocols.find((item: any) => item.studyId.toString() === selectedProtocol?.value);
      if(protocol?.trainingIncomplete && userRole != USER_ROLE_ENUM.SYSTEM_ADMIN) {
        toast.warn('Training Incomplete for the protocol!');
        setTimeout(() => {
          router.push(`training?studyId=${protocol.studyId}`);
        }, 3000);
      };

      setSubjectEntryFormat(protocol?.subjectIdEntryFormat ?? '');

      const prescreen = protocolList?.data?.protocols?.find(
        ({ studyId }: any) => studyId.toString() === selectedProtocol?.value
      )?.isPreScreen;
      setIsPreScreen(prescreen);
  
      // set query param
      if (!prescreen) {
        setQueryParams({ StudyId: selectedProtocol?.value });
      }
    };
  }, [selectedProtocol]);

  useEffect(() => {
    setQueryParams((data) => {
      if (data) {
        return {
          ...data,
          PageSize: pageSize
        }
      } else {
        return { PageSize: pageSize };
      };
    });
  }, [pageSize]);

  useEffect(() => {
    const orderby: any = sorting.map((s) => `${s.id} ${s.desc ? 'desc' : 'asc'}`).join(',');
    setQueryParams((data) => ({
      ...data,
      orderBy: typeof orderby != 'undefined' && orderby ? orderby : null
    }));
  }, [sorting])

  return (
    <main>
      <Breadcrumbs title="Subject Management" subTitle="Entry Study Subject" />
      <div className="wrapper" >
        <h4 className="px-6 py-4">{ids ? 'Update Subject' : userRole == USER_ROLE_ENUM.SYSTEM_ADMIN ? 'Subject Entry /  Last Subject Contact' : 'Subject Entry'}</h4>
        <hr />
        <div className="w-full px-6 py-8">
          <div className="flex gap-x-10 mb-4 justify-between">
            <div className='flex flex-col md:flex-row md:items-center md:col-span-2 gap-2 w-full'>
              <Select
                label='Study Type'
                wrapperClassName="w-full"
                onChange={(option) => {
                  if (option) {
                    setSelectedStudy(option);
                    setSelectedProtocol(null!);
                  }
                }}
                value={selectedStudy}
                options={studyTypeOptions}
                isDisabled={!!ids}
              />
            </div>
            <div className='flex flex-col md:flex-row md:items-center md:col-span-2 gap-2 w-full'>
              <Select
                label='Select a protocol'
                wrapperClassName="w-full"
                onChange={(option) => {
                  if (option) {
                    setSelectedProtocol(option);
                    setQueryParams({ StudyId: option.value });
                  }
                }}
                value={selectedProtocol}
                options={protocolOptions}
              />
            </div>
          </div>
          {((userRole == USER_ROLE_ENUM.SITE_USER && selectedProtocol?.value) || ids) &&
            <div>
              <AddSubjectForm dropdowns={dropdowns?.data || []} protocolId={selectedProtocol?.value} subjectIdFormat={subjectEntryFormat} restSubjectIdFormat={restSubjectIdFormat} setSelectedProtocol={setSelectedProtocol} ids={ids} setStudyType={setSelectedStudy} protocolList={protocolList?.data.protocols} userId={userId} setUserId={setUserId}/>
            </div>}
          {((userRole == USER_ROLE_ENUM.SYSTEM_ADMIN && selectedProtocol?.value && !ids)) &&
            <div>
              <SearchSubjectForm setQueryParams={setQueryParams} protocolId={selectedProtocol?.value} isLoadingSearch={isSubjectLoading}/>
            </div>}
          {userRole !== USER_ROLE_ENUM.SITE_USER && userRole !== USER_ROLE_ENUM.SYSTEM_ADMIN && !ids && selectedProtocol?.value && <SubjectEntrySelectionTab currentTab={currentTab} setCurrentTab={setCurrentTab} ids={ids} isPreScreen={isPreScreen} subjectEntryFormat={subjectEntryFormat} protocolList={protocolList?.data.protocols} protocolId={selectedProtocol?.value} setSelectedProtocol={setSelectedProtocol} setQueryParams={setQueryParams} dropdowns={dropdowns?.data || []} setStudyType={setSelectedStudy} userId={userId} setUserId={setUserId} isLoadingSearch={isSubjectLoading}/>}
        </div>
      </div>
      {((userRole == USER_ROLE_ENUM.SYSTEM_ADMIN && selectedProtocol?.value && !ids)) &&
        <div>
          <ListTable data={subjectList?.data.items} isLoading={isSubjectLoading || isRefetchingSubject} protocolId={selectedProtocol?.value} onUpdateSubject={onUpdateSubject} sorting={sorting} setSorting={setSorting} />
          <Pagination
            currentPage={subjectList?.data?.pageNumber ?? 1}
            lastPage={subjectList?.data?.totalPages ?? 0}
            maxLength={7}
            setCurrentPage={setCurrentPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>}
      {/* {
        currentTab === "last" && (
          <ListTable data={subjectList?.data} isLoading={isSubjectLoading} protocolId={selectedProtocol?.value} />
        )
      } */}

    </main>
  );
};

export default SubjectEntryEditForm;
