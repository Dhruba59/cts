import { Query } from "./query";

export interface Site {
    siteId: number;
    siteName: string;
    address: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    siteNumber: string | null;
    siteZip: string | null;
    siteCode: string | null;
    sponsorId: number | null;
    active: boolean | null;
    frequencyTypeId: number;
    primaryContactPhone: string | null;
    primaryContactName: string | null;
    primaryContactEmail: string | null;
    locationId: string | null;
    piname: string | null;
    partialDateAllowed: boolean;
}

export interface SiteQuery extends Site, Query{
    
}