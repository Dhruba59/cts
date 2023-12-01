
import { getSponsors, getSponsorById, addSponsor, editSponsor, deleteSponsor } from "@/service/sponsor-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";



export const useGetSponsors = () => useQuery({
  queryFn: getSponsors,
})
export const useGetSponsorById = () => useQuery({
  queryFn: getSponsorById,
})

export const useAddSponsor = () => useMutation({
  mutationFn: addSponsor,
})

export const useEditSponsor = () => useMutation({
  mutationFn: editSponsor,
})

export const useDeleteSponsor = () => useMutation({
  mutationFn: deleteSponsor
})
