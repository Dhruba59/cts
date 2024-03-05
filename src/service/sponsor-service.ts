import { DeleteSponsorPayload, Sponsor, SponsorQuery } from "@/model/sponsor";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getSponsorById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'Sponsor/GetById', method: 'GET', params});
}
export const getSponsors = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({url: 'Sponsor/Get', method: 'GET', params});
}

export const addSponsor = (data: Sponsor) => {
  return requestAxios({url: 'Sponsor', method: 'POST', data});
}

export const editSponsor = (data: Sponsor) => {
  return requestAxios({url: 'Sponsor', method: 'PUT', data});
} 


export const deleteSponsor = (data: DeleteSponsorPayload) => {
  return requestAxios({url: 'Sponsor', method: 'DELETE', data});
}
