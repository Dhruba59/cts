
import { getStudyCompounds, getStudyCompoundById, 
  addStudyCompound, editStudyCompound, deleteStudyCompound 
} from "@/service/study-compound-service";
import { useMutation, useQuery } from "react-query";

export const useGetStudyCompounds = (queryData: any) => useQuery({
  queryFn: getStudyCompounds,
  queryKey: ['study', queryData],
  retry: false
})

export const useGetStudyCompoundById = (id: any) => useQuery({
  queryFn: getStudyCompoundById,
  queryKey: ['studyCompound', { StudyCompoundId: id }],
  enabled: !!id,
  cacheTime: 0,
  retry: false
})

export const useAddStudyCompound = () => useMutation({
  mutationFn: addStudyCompound,
})

export const useEditStudyCompound = () => useMutation({
  mutationFn: editStudyCompound,
})

export const useDeleteStudyCompound = () => useMutation({
  mutationFn: deleteStudyCompound
})
