import { CriticalDndDataType } from "@/model/study";
import { DndDataType } from "@/types/common";

export const initialAssignedData = [
  {
    title: "Sites",
    items: [],
  },
  {
    title: "Selected",
    items: [],
  },
]

export const initialCriticalDndData = [
  {
    title: "Inclusion Criteria",
    items: [],
  },
  {
    title: "Indications",
    items: [],
  },
  {
    title: "Exclusion Criteria",
    items: [],
  },
]

export const getInitialInputRangeValue = (min:number, max: number) => ({
  minValue: min,
  maxValue: max
})

export const getUpdatedDndData = (data:DndDataType[], title: string, fieldToUpdate: string, fieldData: DndDataType[]): DndDataType[] => (
  data.map((item) => {
    if (item.title === title) {
      return {
        ...item,
        [fieldToUpdate]: fieldData,
      };
    }
    return item;
  })
);  

export const getUpdatedCriticalDndData = (data:CriticalDndDataType[], title: string, fieldToUpdate: string, fieldData: DndDataType[]): CriticalDndDataType[] => (
  data.map((item) => {
    if (item.title === title) {
      return {
        ...item,
        [fieldToUpdate]: fieldData,
      };
    }
    return item;
  })
);  

export const initialFormValues = {
  studyName: '',
  subjectIdentryFormat: '',
  protocolNumber: '',
  phase: '',
  active: false,
  studyCommentType: '',
  maxSubjects: '',
  sr: false,
  studyCompound: '',
  sponsor: '',
  study_duration: '',
  preScreen: false,
  date: {
    startDate: null,
    endDate: null
  },
  dslsp: '',
  minBmi: '',
  maxBmi: '',
  minAge: '',
  maxAge: '',
}