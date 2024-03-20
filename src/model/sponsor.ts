import { UseFormReturn } from "react-hook-form";
import { Query } from "./query";

export interface Sponsor {
    sponsorId?: number | null;
    sponsorName?: string | null;
    address1?: string | null;
    address2?: string | null;
    address3?: string | null;
    city?: string | null;
    zip?: string | null;
    state?: string | null;
    active?: boolean | null;
}

export interface SponsorQuery extends Omit<Sponsor, 'sponsorId' | 'address3' >, Query {

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
    form: UseFormReturn;
  }


 export interface AddSponsorProps  {
    id?: string
  }