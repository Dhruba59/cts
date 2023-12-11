import { Protocol } from "@/model/subject"

export const getProtocolsDropdown = (data: Protocol[]) => {
  return data?.map((protocol) => ({ value: protocol.studyId.toString(), label: protocol.protocolNumber }))
}