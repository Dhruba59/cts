
import { getSites, getSiteById,
  getFrequencyTypes, addSite, editSite, deleteSite 
} from "@/service/site-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetSites = () => useQuery({
  queryFn: getSites,
})
export const useGetSiteById = () => useQuery({
  queryFn: getSiteById,
})

export const useAddSite = () => useMutation({
  mutationFn: addSite,
})


export const useEditSite = () => useMutation({
  mutationFn: editSite,
})

export const useGetFrequencyTypes = () => useQuery({
  queryFn: getFrequencyTypes,
})

export const useDeleteSite = () => useMutation({
  mutationFn: deleteSite
})
