import { API_ROUTE_CONSTANT } from "@/constants/api-route";
import { AddUpdateStudyPayload, GetIndicationListParams, StudyDeletePayload } from "@/model/study";
import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const addStudy = (data: AddUpdateStudyPayload) => {
  return requestAxios({ url: API_ROUTE_CONSTANT.STUDY, method: "post", data });
};

export const updateStudy = (data: AddUpdateStudyPayload) => {
  return requestAxios({ url: API_ROUTE_CONSTANT.STUDY, method: "put", data });
};

export const getStudyDropDownsList = () => {
  return requestAxios({ url: `${API_ROUTE_CONSTANT.STUDY}/dropdowns`, method: "get" });
};

export const getIndicationList = ({queryKey}: any) => {
  const [key, { searchField, searchValue }] = queryKey as any;
  const params: GetIndicationListParams = {
    SearchField: parseInt(searchField),
    SearchValue: searchValue
  }
  return requestAxios({ url: `${API_ROUTE_CONSTANT.STUDY}/indication-dropdowns`, method: "get", params });
};

export const getStudyList = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({ url: `${API_ROUTE_CONSTANT.STUDY}/studies`, method: "get", params });
};

export const getStudiyById = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({ url: API_ROUTE_CONSTANT.STUDY, method: "get", params });
};

export const deleteStudyById = (data: StudyDeletePayload) => {
  return requestAxios({ url: API_ROUTE_CONSTANT.STUDY, method: "delete", data });
};
