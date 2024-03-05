
import { getSites, getSiteById,
  getFrequencyTypes, addSite, editSite, deleteSite 
} from "@/service/site-service";
import { useMutation, useQuery } from "react-query";

export const useGetSites = (queryData: any) => useQuery({
  queryFn: getSites,
  queryKey: ['sites', queryData],
  retry: false
})

export const useGetSiteById = (id: any) => useQuery({
  queryFn: getSiteById,
  queryKey: ['siteId', { siteId: id }],
  enabled: !!id,
  retry: false
})

export const useGetFrequencyTypes = () => useQuery({
  queryFn: getFrequencyTypes,
  retry: false
})

export const useAddSite = () => useMutation({
  mutationFn: addSite,
})

export const useEditSite = () => useMutation({
  mutationFn: editSite,
})

export const useDeleteSite = () => useMutation({
  mutationFn: deleteSite
})
