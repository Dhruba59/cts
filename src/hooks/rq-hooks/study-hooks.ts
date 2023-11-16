
import { addStudy, getStudyDropDownsList } from "@/service/study-service";
import { useMutation, useQuery } from "react-query";

export const useAddStudyMutation = () => useMutation({
  mutationFn: addStudy,
})

export const useGetStudyDropdownsList = () => useQuery({
  queryFn: getStudyDropDownsList,
})