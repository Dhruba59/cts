import { request } from "./axios-service";
import { HelpQueryPayload } from "@/model/help";

export const postHelpQuery = (data: HelpQueryPayload) => {
  return request({url: 'Help/submit', method: 'post', data})
}