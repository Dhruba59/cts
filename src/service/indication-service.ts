import { Indication, IndicationQuery } from "@/model/indication";
import { request } from "./axios-service";


export const get_indication_by_id = (data: number) => {
  return request({url: 'Indication/GetById', method: 'GET', data});
}

export const get_indications = (data: IndicationQuery) => {
  return request({url: 'Indication/Get', method: 'GET', data});
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
