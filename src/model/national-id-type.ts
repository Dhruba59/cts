import { Query } from "./query";

export interface NationalIdType {
    nationalTypeId?: number;
    nationalIdtypeName?: string;
    description?: string;
    frequencyTypeId?: number;
    active?: boolean;
}


export interface NationalIdTypeQuery extends NationalIdType, Query {
    frequencyType?: string;
}


export interface NationalIdTypeColumnsProps  {
    onDelete: (id: any) => void
}

export interface DeleteNationalIdTypePayload {
  id: number;
}

export interface AddNationalIdTypeProps {
    id?: string
  }