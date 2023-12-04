import { Query } from "./query";

export interface Site {
    siteId?: number;
    siteName?: string;
    address?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    siteNumber?: string;
    siteZip?: string;
    siteCode?: string;
    sponsorId: number;
    active: boolean;
    frequencyTypeId?: number;
    primaryContactPhone?: string;
    primaryContactName?: string;
    primaryContactEmail?: string;
    locationId?: string;
    piname?: string;
    partialDateAllowed?: boolean;
}

export interface SiteQuery extends Site, Query{
    
}

export interface DeleteSitePayload {
    id: number;
  }