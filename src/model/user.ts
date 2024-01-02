import { number } from "yup";
import { Query } from "./query";

export interface User {
    userId?: string;
    userTypeId?: number;
    siteId?: number;
    userName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    // address3?: string;
    zip?: string;
    city?: string;
    // password?: string;
    // active?: string;
    title?: string;
    state?: string;
    sponsorId?: string;
    email?: string;
    systemLogin?: string;
    protocolIds?: string;
    sponsorProtocols?: string;
    suppressMatchTypeId?: number;
    matchTypeIds?: string;
    notificationSiteIds?: string;
    trainings?: {
      trainingId: number;
      siteStudyId: number;
    }
    // isPasswordChanged?: number;
    // matchType?: number;
    // lastChangeDate?: string;
    // wrongPasswordEntry?: number;
    // accountStatus?: string;
    // status?: string;

    //additional for dormant user 
    // lastLoginTime?: string;
    // inactiveOver?: string;
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

  export interface DeleteDormantUserPayload {
    userIds: number[];
  }
  
  export interface AddUserProps {
    id?: string
  }


  export interface DormantUserListColumnsProps  {
    onDelete: (id: any) => void,
    pageSize: number,
    onRowSelectionChange: any, 
    onAllRowsSelectionChange: any
  }