import { Site, SiteQuery, DeleteSitePayload } from "@/model/site";
import { request } from "./axios-config";


export const getSiteQueryById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'Site/GetById', method: 'GET', params});
}

export const getFrequencyTypes = () => {
  return request({url: 'Site/GetIndicationCodeTypes', method: 'GET'});
}

export const getSites = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'Site/Get', method: 'GET', params});
}

export const addSite = (data: Site) => {
  return request({url: 'Site', method: 'POST', data});
}

export const editSite = (data: Site) => {
  return request({url: 'Site', method: 'PUT', data});
} 


export const deleteIndication = (data: DeleteSitePayload) => {
  return request({url: 'Indication', method: 'DELETE', data});
}
