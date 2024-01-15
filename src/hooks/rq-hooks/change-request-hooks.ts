import { SubjectDetailsParams } from "@/model/change-request";
import { addChangeRequest, acceptChangeRequest, rejectChangeRequest, viewChangeRequestDetail, getChangeRequestAudit, getChangeRequestAuditDetail, getChangeRequestBySubject, getChangeRequestDashboard, getChangeRequestReprint, getDashboardDropdown, getRequestTypeDropdown, getSubjectDetails } from "@/service/change-request-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";


export const useRequestTypeDropdown = () => useQuery({
  queryFn: getRequestTypeDropdown,
  //queryKey: ['sort', queryData],
})

export const useDashboardDropdown = () => useQuery({
  queryFn: getDashboardDropdown,
  //queryKey: ['sort', queryData],
})

export const useGetChangeReqSubjectDetails = (queryData : SubjectDetailsParams) => useQuery({
  queryFn: getSubjectDetails,
  queryKey: ['ChangeReqSubjectDetails', queryData],
  enabled: (!!queryData.SubjectId && !!queryData.NationalTypeId)
});

export const useChangeRequestReprint = (queryData : any) => useQuery({
  queryFn: getChangeRequestReprint,
  queryKey: ['changeRequestReprint', queryData],
});

export const useChangeRequestDashboard = (queryData : any) => useQuery({
  queryFn: getChangeRequestDashboard,
  queryKey: ['sort', queryData],
});

export const useChangeRequestDashboardDropdowns = () => useQuery({
  queryFn: getChangeRequestDashboard
});

export const useChangeRequestReprintDropdowns = () => useQuery({
  queryFn: getChangeRequestReprint
});

export const useChangeRequestAudit = (queryData : any) => useQuery({
  queryFn: getChangeRequestAudit,
  queryKey: ['sort', queryData],
})
export const useChangeRequestAuditDetail = (queryData : any) => useQuery({
  queryFn: getChangeRequestAuditDetail,
  queryKey: ['sort', queryData],
});

export const useChangeRequestBySubject = (queryData : any) => useQuery({
  queryFn: getChangeRequestBySubject,
  queryKey: ['sort', queryData],
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
  mutationFn: addChangeRequest,
})


export const useAcceptChangeRequest = () => useMutation({
  mutationFn: acceptChangeRequest,
})

export const useRejectChangeRequest = () => useMutation({
  mutationFn: rejectChangeRequest
})


export const useViewChangeRequestDetail = (queryData : any) => useQuery({
  queryFn: viewChangeRequestDetail,
  queryKey: ['sort', queryData],
})
