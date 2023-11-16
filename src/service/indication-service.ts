import { Indication, IndicationQuery } from "@/model/indication";
import { request } from "./axios-config";


export const get_indication_by_id = (params: number) => {
  return request({url: 'Indication/GetById', method: 'GET', params});
}

export const get_indications = (params: IndicationQuery) => {
  return request({url: 'Indication/Get', method: 'GET', params});
}

export const add_indication = (data: Indication) => {
  return request({url: 'Indication', method: 'POST', data});
}

export const update_indication = (data: Indication) => {
  return request({url: 'Indication', method: 'PUT', data});
} 

export const delete_indication = (data: number) => {
  return request({url: 'Indication', method: 'DELETE', data});
}
