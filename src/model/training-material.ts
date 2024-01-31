import { Query } from "./query";
import AddTrainingMeterialPage from '../app/(main)/training-material/add/page';

export interface TrainingMaterial {
  studyId?: string | null;
  trainingId?: number | null;
  trainingName?: string| null;
  passMarks?: number| null;
  displayOrder?: number| null;
  materialId?: number| null;
  fileName?: string| null; 
  filePath?: string| null;
  preScreen?: boolean| null;
  active?: boolean| null;
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

