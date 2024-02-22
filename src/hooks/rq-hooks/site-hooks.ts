
import { getSites, getSiteById,
  getFrequencyTypes, addSite, editSite, deleteSite 
} from "@/service/site-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetSites = (queryData: any) => useQuery({
  queryFn: getSites,
  queryKey: ['sites', queryData],
})
export const useGetSiteById = (id: any) => useQuery({
  queryFn: getSiteById,
  queryKey: ['siteId', { siteId: id }],
  enabled: !!id
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
