import { addNewSubject, checkDetailRequirement, getLastSubjectReport, getVisitTypes, updateVisitInfo, validateSponsorSubjectId, verifySocialCode } from "@/service/subject-service";
import { useMutation, useQuery } from "react-query";

export const useAddSubjectMutation = () => useMutation({
  mutationFn: addNewSubject,
})

export const useCheckDetailRequirement = () => useMutation({
  mutationFn: checkDetailRequirement,
})

export const useValidateSponsorSubjectId = () => useMutation({
  mutationFn: validateSponsorSubjectId,
})

export const useIsDetailsRequired = () => useMutation({
  mutationFn: checkDetailRequirement,
})

export const useVerifySocialCode = () => useMutation({
  mutationFn: verifySocialCode,
})

export const useUpdateVisitInfo = () => useMutation({
  mutationFn: updateVisitInfo,
})

export const useGetVisitTypes = () => useQuery({
  queryFn: getVisitTypes,
})

export const useGetLastSubjectReport = () => useQuery({
  queryFn: getLastSubjectReport,
})