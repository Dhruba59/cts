import { API_ROUTE_CONSTANT } from "@/constants/api-route";
import { request } from "./axios-config";
import { AddStudyPayload } from "@/model/study";



export const addStudy = (data: AddStudyPayload) => {
  return request({ url: API_ROUTE_CONSTANT.STUDY, method: "post", data });
};

export const getStudyDropDownsList = () => {
  return request({ url: `${API_ROUTE_CONSTANT.STUDY}/dropdowns`, method: "get" });
};
