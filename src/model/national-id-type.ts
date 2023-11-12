import { Query } from "./query";

export interface NationalIdType {
    nationalTypeId: number;
    nationalIdtypeName: string;
    description: string | null;
    frequencyTypeId: number;
    active: boolean;
}


export interface NationalIdTypeQuery extends NationalIdType, Query {

}