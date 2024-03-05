import { axiosApi } from "@/hooks/axiosApi";

const requestAxios = axiosApi()

export const getSubjectMatchReport = ({queryKey}: any) => {
  const [key, params ] = queryKey as any;
  return requestAxios({ url: `Report/get-subject-match-report`, method: "get", params });
};
