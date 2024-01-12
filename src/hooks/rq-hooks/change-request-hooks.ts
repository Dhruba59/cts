import { SubjectDetailsParams } from "@/model/change-request";
import { addChangeRequest, deleteChangeRequest, editChangeRequest, getChangeRequestAudit, getChangeRequestAuditDetail, getChangeRequestBySubject, getChangeRequestDashboard, getChangeRequestDashboardDropdows, getChangeRequestReprint, getChangeRequestReprintDropdowns, getSubjectDetails, saveChangeRequest } from "@/service/change-request-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";

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
  queryFn: getChangeRequestDashboardDropdows
});

export const useChangeRequestReprintDropdowns = () => useQuery({
  queryFn: getChangeRequestReprintDropdowns
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
});
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


export const useEditChangeRequest = () => useMutation({
  mutationFn: editChangeRequest,
})

// export const useGetIndicationCodeTypes = () => useQuery({
//   queryFn: getIndicationCodeTypes,
// })

export const useDeleteChangeRequest = () => useMutation({
  mutationFn: deleteChangeRequest
})
