
import { add_indication, get_indications, get_indication_code_types, edit_indication } from "@/service/indication-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";


export interface getIndicationListProps {
  searchField: string;
  searchValue: string;
}

export const useAddIndicationMutation = () => useMutation({
  mutationFn: add_indication,
})


export const useEditIndicationMutation = () => useMutation({
  mutationFn: edit_indication,
})

export const useGetIndicationCodeTypes = () => useQuery({
  queryFn: get_indication_code_types,
})

// export const useGetStudyIndicationList = ( options: UseQueryOptions) => useQuery({
//   queryFn: getIndicationList,
//   ...options
// })