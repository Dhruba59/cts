import { Query } from "./query";
import AddTrainingMeterialPage from '../app/(main)/training-material/add/page';

export interface TrainingMaterial {
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


export interface TrainingMaterialQuery extends TrainingMaterial, Query {

}


export interface TrainingMaterialColumnsProps {
  onDelete: (id: any) => void
}

export interface DeleteTrainingMaterialPayload {
  id: number;
}

export interface AddTrainingMaterialProps {
  id?: string
}

