
import { getStudyCompounds, getStudyCompoundById, 
  addStudyCompound, editStudyCompound, deleteStudyCompound 
} from "@/service/study-compound-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetStudyCompounds = () => useQuery({
  queryFn: getStudyCompounds,
})
export const useGetStudyCompoundById = () => useQuery({
  queryFn: getStudyCompoundById,
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
