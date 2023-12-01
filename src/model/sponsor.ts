import { Query } from "./query";

export interface Sponsor {
    sponsorId?: number;
    sponsorName?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    zip?: string;
    state?: string;
    active?: boolean | null;
}

export interface SponsorQuery extends Sponsor, Query {

}

export interface SponsorListColumnsProps {
    onDelete: (id: any) => void
}

export interface getSponsorListProps {
    searchField: string;
    searchValue: string;
}

export interface DeleteSponsorPayload {
    id: number;
}

export interface SearchFormProps {
    isAdvancedOpen: boolean;
    register: any;
    Controller: any;
    control: any;
    reset: any;
  }


 export interface AddSponsorProps  {
    id?: string
  }