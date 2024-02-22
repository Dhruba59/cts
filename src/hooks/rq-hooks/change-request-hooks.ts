import { SubjectDetailsParams } from "@/model/change-request";
import { addChangeRequest, acceptChangeRequest, rejectChangeRequest, viewChangeRequestDetail, getChangeRequestAudit, getChangeRequestAuditDetail, getChangeRequestBySubject, getChangeRequestDashboard, getChangeRequestReprint, getDashboardDropdown, getRequestTypeDropdown, getSubjectDetails, saveChangeRequest, changeOperation, getChangeRequestVisitTypes, getChangeRequestDashboardDropdows, getChangeRequestReprintDropdowns } from "@/service/change-request-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";


export const useRequestTypeDropdown = () => useQuery('requestTypeDropdown' ,{
  queryFn: getRequestTypeDropdown,
  //queryKey: ['sort', queryData],
})

export const useDashboardDropdown = () => useQuery({
  queryFn: getDashboardDropdown,
  //queryKey: ['sort', queryData],
})

export const useGetChangeReqSubjectDetails = (queryData : SubjectDetailsParams) => useQuery({
  queryFn: getSubjectDetails,
  queryKey: ['changeReqSubjectDetails', queryData],
  enabled: (!!queryData.SubjectId && !!queryData.NationalTypeId)
});

export const useChangeRequestReprint = (queryData : any) => useQuery({
  queryFn: getChangeRequestReprint,
  queryKey: ['changeRequestReprint', queryData],
});

export const useChangeRequestDashboard = (queryData : any) => useQuery({
  queryFn: getChangeRequestDashboard,
  queryKey: ['changeRequestDashboard', queryData],
});

export const useChangeRequestDashboardDropdowns = () => useQuery('changeRequestDashboardDropdowns', {
  queryFn: getChangeRequestDashboardDropdows
});

export const useGetChangeReqVisitTypes = () => useQuery('changeRequestVisitType', {
  queryFn: getChangeRequestVisitTypes
});

export const useChangeRequestReprintDropdowns = () => useQuery('changeRequestReprintDropdowns', {
  queryFn: getChangeRequestReprintDropdowns
});

export const useChangeRequestAudit = (queryData : any) => useQuery({
  queryFn: getChangeRequestAudit,
  queryKey: ['changeRequestAudit', queryData],
})
export const useChangeRequestAuditDetail = (queryData : any) => useQuery({
  queryFn: getChangeRequestAuditDetail,
  queryKey: ['changeRequestAuditDetail', queryData],
});

export const useChangeRequestBySubject = (queryData : any) => useQuery({
  queryFn: getChangeRequestBySubject,
  queryKey: ['changeRequestBySubject', queryData],
})

// export const useGetIndicationById = (id :any) => useQuery({
//   queryFn: getIndicationById,
//   queryKey: ['indication', { indicationId: id }],
//   enabled: !!id
// })

export const useChangeRequest = () => useMutation({
  mutationFn: addChangeRequest,
})

export const useSaveChangeRequest = () => useMutation({
  mutationFn: saveChangeRequest,
})

export const useChangeRequestChangeOperation = () => useMutation({
  mutationFn: changeOperation,
})

export const useAcceptChangeRequest = () => useMutation({
  mutationFn: acceptChangeRequest,
})

export const useRejectChangeRequest = () => useMutation({
  mutationFn: rejectChangeRequest
})


export const useViewChangeRequestDetail = (queryData : any) => useQuery({
  queryFn: viewChangeRequestDetail,
  queryKey: ['viewChangeRequestDetail', queryData],
})
