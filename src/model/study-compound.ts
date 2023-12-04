import { Query } from "./query";
import { Study } from "./study";

export interface StudyCompound {
    studyCompoundNameId?: number;
    studyCompoundName?: string;
    description?: string;
    active?: boolean;
    //studyTbs: Study[];
}

export interface StudyCompoundQuery extends StudyCompound, Query{

}

export interface DeleteStudyCompoundPayload {
    id: number;
  }


  export interface StudyCompoundListColumnsProps {
    onDelete: (id: any) => void
  }

  export interface AddStudyCompoundProps {
    id?: string
  }