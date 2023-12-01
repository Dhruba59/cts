import { DeleteSponsorPayload, Sponsor, SponsorQuery } from "@/model/sponsor";
import { request } from "./axios-config";


export const getSponsorById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'Sponsor/GetById', method: 'GET', params});
}
export const getSponsors = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({url: 'Sponsor/Get', method: 'GET', params});
}

export const addSponsor = (data: Sponsor) => {
  return request({url: 'Sponsor', method: 'POST', data});
}

export const editSponsor = (data: Sponsor) => {
  return request({url: 'Sponsor', method: 'PUT', data});
} 


export const deleteSponsor = (data: DeleteSponsorPayload) => {
  return request({url: 'Sponsor', method: 'DELETE', data});
}
