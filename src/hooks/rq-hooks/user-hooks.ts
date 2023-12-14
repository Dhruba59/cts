
import { getUsers, getUserById, 
  getDormantUsers, addUser, editUser, deleteUser, deleteDormantUsers 
} from "@/service/user-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";




export const useGetUsers = (queryData : any) => useQuery({
  queryFn: getUsers,
  queryKey: ['sort', queryData],
})
export const useGetUserById = (id :any) => useQuery({
  queryFn: getUserById,
  queryKey: ['TrainingId', { TrainingId: id }],
  enabled: !!id
})

export const useAddUser = () => useMutation({
  mutationFn: addUser,
})


export const useEditUser = () => useMutation({
  mutationFn: editUser,
})

export const useGetDormantUsers = (queryData : any) => useQuery({
  queryFn: getDormantUsers,
  queryKey: ['sort', queryData]
})

export const useDeleteUser = () => useMutation({
  mutationFn: deleteUser
})


export const useDeleteDormantUsers = () => useMutation({
  mutationFn: deleteDormantUsers
})
