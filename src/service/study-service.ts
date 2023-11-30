import { API_ROUTE_CONSTANT } from "@/constants/api-route";
import { request } from "./axios-config";
import { AddUpdateStudyPayload } from "@/model/study";
import { getIndicationListProps } from "@/hooks/rq-hooks/study-hooks";

interface GetIndicationListParams {
  SearchField: number;
  SearchValue: string;
}

export const addStudy = (data: AddUpdateStudyPayload) => {
  return request({ url: API_ROUTE_CONSTANT.STUDY, method: "post", data });
};

export const updateStudy = (data: AddUpdateStudyPayload) => {
  return request({ url: API_ROUTE_CONSTANT.STUDY, method: "put", data });
};

export const getStudyDropDownsList = () => {
  return request({ url: `${API_ROUTE_CONSTANT.STUDY}/dropdowns`, method: "get" });
};

export const getIndicationList = ({queryKey}: any) => {
  const [key, { searchField, searchValue }] = queryKey as any;
  const params: GetIndicationListParams = {
    SearchField: parseInt(searchField),
    SearchValue: searchValue
  }
  return request({ url: `${API_ROUTE_CONSTANT.STUDY}/indication-dropdowns`, method: "get", params });
};

export const getStudyList = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `${API_ROUTE_CONSTANT.STUDY}/studies`, method: "get", params });
};

export const getStudiyById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: API_ROUTE_CONSTANT.STUDY, method: "get", params });
};
