
import { addStudy, getIndicationList, getStudyDropDownsList } from "@/service/study-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";

export interface getIndicationListProps {
  searchField: string;
  searchValue: string;
}

export const useAddStudyMutation = () => useMutation({
  mutationFn: addStudy,
})

export const useGetStudyDropdownsList = () => useQuery({
  queryFn: getStudyDropDownsList,
})

// export const useGetStudyIndicationList = ( options: UseQueryOptions) => useQuery({
//   queryFn: getIndicationList,
//   ...options
// })