import { addChangeRequest, deleteChangeRequest, editChangeRequest, getChangeRequestAudit, getChangeRequestAuditDetail, getChangeRequestBySubject, getChangeRequestDashboard, getChangeRequestReprint, getRequestTypeDropdown } from "@/service/change-request-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useChangeRequestReprint = (queryData : any) => useQuery({
  queryFn: getChangeRequestReprint,
  queryKey: ['sort', queryData],
})

export const useChangeRequestDashboard = (queryData : any) => useQuery({
  queryFn: getChangeRequestDashboard,
  queryKey: ['sort', queryData],
})

export const useRequestTypeDropdown = () => useQuery({
  queryFn: getRequestTypeDropdown,
  //queryKey: ['sort', queryData],
})

export const useChangeRequestAudit = (queryData : any) => useQuery({
  queryFn: getChangeRequestAudit,
  queryKey: ['sort', queryData],
})
export const useChangeRequestAuditDetail = (queryData : any) => useQuery({
  queryFn: getChangeRequestAuditDetail,
  queryKey: ['sort', queryData],
})

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


export const useEditChangeRequest = () => useMutation({
  mutationFn: editChangeRequest,
})

// export const useGetIndicationCodeTypes = () => useQuery({
//   queryFn: getIndicationCodeTypes,
// })

export const useDeleteChangeRequest = () => useMutation({
  mutationFn: deleteChangeRequest
})
