
import { addIndication, getIndications, getIndicationCodeTypes, editIndication, deleteIndicationById } from "@/service/indication-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";


export interface getIndicationListProps {
  searchField: string;
  searchValue: string;
}


export const useAddIndicationMutation = () => useMutation({
  mutationFn: addIndication,
})


export const useEditIndicationMutation = () => useMutation({
  mutationFn: editIndication,
})

export const useGetIndicationCodeTypes = () => useQuery({
  queryFn: getIndicationCodeTypes,
})

export const useDeleteIndication = () => useMutation({
  mutationFn: deleteIndicationById
})
// export const useGetStudyIndicationList = ( options: UseQueryOptions) => useQuery({
//   queryFn: getIndicationList,
//   ...options
// })