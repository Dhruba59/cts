import { request } from "./axios-config";

export const getSubjectMatchReport = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return request({ url: `Report/get-subject-match-report`, method: "get", params });
};
