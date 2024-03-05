import { axiosApi } from "@/hooks/axiosApi";
import { HelpQueryPayload } from "@/model/help";

const requestAxios = axiosApi()

export const postHelpQuery = (data: HelpQueryPayload) => {
  return requestAxios({url: 'Help/submit', method: 'post', data})
}