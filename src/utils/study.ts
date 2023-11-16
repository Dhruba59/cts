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