
import { Query } from "./query";

export interface Indication {
    indicationId: number;
    code: string | null;
    indicationName: string;
    codeType: string;
    description: string | null;
    active: boolean | null;
    isRequireDetails: boolean | null;
}


export interface IndicationQuery extends Indication, Query {

}