import { request } from "./axios-config";
import { HelpQueryPayload } from "@/model/help";

export const postHelpQuery = (data: HelpQueryPayload) => {
  return request({url: 'Help/submit', method: 'post', data})
}