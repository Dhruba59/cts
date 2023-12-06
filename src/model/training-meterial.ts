import { Query } from "./query";
import AddTrainingMeterialPage from './../app/(main)/training-material/add/page';

export interface TrainingMeterial {
  trainingId?: number;
  trainingName?: string;
  passMarks?: number;
  displayOrder?: number;
  materialId?: number;
  fileName?: string; 
  filePath?: string;
  preScreen?: boolean;
  active?: boolean;
}


export interface TrainingMeterialQuery extends TrainingMeterial, Query {

}


export interface TrainingMeterialColumnsProps {
  onDelete: (id: any) => void
}

export interface DeleteTrainingMeterialPayload {
  id: number;
}

export interface AddTrainingMeterialProps {
  id?: string
}