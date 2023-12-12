import { addNewSubject, checkDetailRequirement, validateSponsorSubjectId } from "@/service/subject-service";
import { useMutation } from "react-query";

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