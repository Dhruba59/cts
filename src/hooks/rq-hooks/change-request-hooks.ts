import { SubjectDetailsParams } from "@/model/change-request";
import { addChangeRequest, acceptChangeRequest, rejectChangeRequest, viewChangeRequestDetail, getChangeRequestAudit, getChangeRequestAuditDetail, getChangeRequestBySubject, getChangeRequestDashboard, getChangeRequestReprint, getDashboardDropdown, getRequestTypeDropdown, getSubjectDetails, saveChangeRequest, changeOperation, getChangeRequestVisitTypes, getChangeRequestDashboardDropdows, getChangeRequestReprintDropdowns } from "@/service/change-request-service";
import { useMutation, useQuery } from "react-query";


export const useRequestTypeDropdown = () => useQuery('requestTypeDropdown' ,{
  queryFn: getRequestTypeDropdown,
  retry: false
  //queryKey: ['sort', queryData],
})

export const useDashboardDropdown = () => useQuery('getDashboardDropdown',{
  queryFn: getDashboardDropdown,
  retry: false
  //queryKey: ['sort', queryData],
})

export const useGetChangeReqSubjectDetails = (queryData : SubjectDetailsParams) => useQuery({
  queryFn: getSubjectDetails,
  queryKey: ['changeReqSubjectDetails', queryData],
  enabled: (!!queryData.SubjectId && !!queryData.NationalTypeId),
  retry: false
});

export const useChangeRequestReprint = (queryData : any) => useQuery({
  queryFn: getChangeRequestReprint,
  queryKey: ['changeRequestReprint', queryData],
  retry: false
});

export const useChangeRequestDashboard = (queryData : any) => useQuery({
  queryFn: getChangeRequestDashboard,
  queryKey: ['changeRequestDashboard', queryData],
  retry: false
});

export const useChangeRequestDashboardDropdowns = () => useQuery('changeRequestDashboardDropdowns', {
  queryFn: getChangeRequestDashboardDropdows,
  retry: false
});

export const useGetChangeReqVisitTypes = () => useQuery('changeRequestVisitType', {
  queryFn: getChangeRequestVisitTypes,
  retry: false
});

export const useChangeRequestReprintDropdowns = () => useQuery('changeRequestReprintDropdowns', {
  queryFn: getChangeRequestReprintDropdowns,
  retry: false
});

export const useChangeRequestAudit = (queryData : any) => useQuery({
  queryFn: getChangeRequestAudit,
  queryKey: ['changeRequestAudit', queryData],
  retry: false
})
export const useChangeRequestAuditDetail = (queryData : any) => useQuery({
  queryFn: getChangeRequestAuditDetail,
  queryKey: ['changeRequestAuditDetail', queryData],
  retry: false
});

export const useChangeRequestBySubject = (queryData : any) => useQuery({
  queryFn: getChangeRequestBySubject,
  queryKey: ['changeRequestBySubject', queryData],
  retry: false
})

export const useViewChangeRequestDetail = (queryData : any) => useQuery({
  queryFn: viewChangeRequestDetail,
  queryKey: ['viewChangeRequestDetail', queryData],
  retry: false
})

// export const useGetIndicationById = (id :any) => useQuery({
//   queryFn: getIndicationById,
//   queryKey: ['indication', { indicationId: id }],
//   enabled: !!id,
//   retry: false
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
