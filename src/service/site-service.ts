import { Site, SiteQuery, DeleteSitePayload } from "@/model/site";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getSiteById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'Site/GetById', method: 'GET', params});
}

export const getFrequencyTypes = () => {
  return requestAxios({url: 'Site/country-dropdown', method: 'GET'});
}

export const getSites = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'Site/Get', method: 'GET', params});
}

export const addSite = (data: Site) => {
  return requestAxios({url: 'Site', method: 'POST', data});
}

export const editSite = (data: Site) => {
  return requestAxios({url: 'Site', method: 'PUT', data});
} 


export const deleteSite = (data: DeleteSitePayload) => {
  return requestAxios({url: 'Site', method: 'DELETE', data});
}
