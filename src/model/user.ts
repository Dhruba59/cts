import { number } from "yup";
import { Query } from "./query";

export interface User {
    userId?: number;
    linkId?: number;
    userName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    zip?: string;
    city?: string;
    password?: string;
    active?: string;
    title?: string;
    state?: string;
    sponsor?: string;
    email?: string;
    systemLogin?: string;
    isPasswordChanged?: number;
    matchType?: number;
    lastChangeDate?: string;
    wrongPasswordEntry?: number;
    accountStatus?: string;
    status?: string;

    //additional for dormant user 
    lastLoginTime?: string;
    inactiveOver?: string;
}

export interface UserQuery extends User, Query {
    
     //additional for dormant user 
    inactiveMonth?: number | null
}


export interface UserListColumnsProps {
    onDelete: (id: any) => void
  }
  
  export interface DeleteUserPayload {
    id: number;
  }
  
  export interface AddUserProps {
    id?: string
  }


  export interface DormantUserListColumnsProps  {
    onDelete: (id: any) => void
  }