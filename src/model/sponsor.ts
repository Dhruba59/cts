import { Query } from "./query";

export interface Sponsor {
    sponsorId: number;
    sponsorName: string;
    address1: string | null;
    address2: string | null;
    address3: string | null;
    city: string | null;
    zip: string | null;
    state: string | null;
    active: boolean | null;
}

export interface SponsorQuery extends Sponsor, Query{
    
}