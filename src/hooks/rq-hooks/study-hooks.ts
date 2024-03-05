
import { addStudy, deleteStudyById, getStudyDropDownsList, updateStudy } from "@/service/study-service";
import { useMutation, useQuery } from "react-query";

export interface getIndicationListProps {
  searchField: string;
  searchValue: string;
}

export const useGetStudyDropdownsList = () => useQuery({
  queryFn: getStudyDropDownsList,
  retry: false
})

export const useAddStudyMutation = () => useMutation({
  mutationFn: addStudy,
})

export const useUpdateStudyMutation = () => useMutation({
  mutationFn: updateStudy,
})

export const useGetStudyDelete = () => useMutation({
  mutationFn: deleteStudyById
})

// export const useGetStudyIndicationList = ( options: UseQueryOptions) => useQuery({
//   queryFn: getIndicationList,
  // retry: false
//   ...options
// })