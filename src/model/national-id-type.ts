import { BasicTabSearchBarContentsProps } from "./common";
import { SelectOptionType } from "./drop-down-list";
import { Query } from "./query";

export interface NationalIdType {
  nationalTypeId?: number;
  nationalIdtypeName?: string;
  description?: string;
  frequencyTypeId?: number;
  frequencyType?: string;
  active?: boolean;
}

export interface NationalIdTypeQuery extends Query {
  typeName?: string;
  countryId?: number | string;
  description?: string;
}

export interface NationalIdTypeColumnsProps {
  onDelete: (id: any) => void;
}

export interface DeleteNationalIdTypePayload {
  id: number;
}

export interface AddNationalIdTypeProps {
  id?: string;
}

export interface IdsTabSearchBarContentProps
  extends BasicTabSearchBarContentsProps {
    countryOptions: SelectOptionType[];
  }
