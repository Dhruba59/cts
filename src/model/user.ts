import { number } from "yup";
import { Query } from "./query";
import { CompletedTraining } from "@/features/user/add/training/training";

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
    active?: boolean;
    sponsorId?: string;
    email?: string;
    systemLogin?: string;
    protocolIds?: string;
    sponsorProtocols?: string;
    suppressMatchTypeId?: number;
    matchTypeIds?: string;
    notificationSiteIds?: string;
    completedTrainingStatus?: CompletedTrainingEditableStatus[];
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

export interface CompletedTrainingEditableStatus {
  dateOfOverridden: string;
  overridden: boolean;
  userTrainingId: number;
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

  export interface ValidateUsernamePayload {
    username: string,
    userId?: number;
  }

  export interface DormantUserListColumnsProps  {
    onDelete: (id: any) => void,
    pageSize: number,
    onRowSelectionChange: any, 
    onAllRowsSelectionChange: any
  }