
import { getUsers, getUserById, 
  getDormantUsers, addUser, editUser, deleteUser, deleteDormantUsers, getUserDropdown, getSiteDetailWithProtocol, getTrainingsByProtocol, getProtocolBySponsor, validateUserName, changeTrainingStatus 
} from "@/service/user-service";
import { useMutation, useQuery } from "react-query";

interface SiteDetailWithProtocolQueryParams {
  SiteId: string | undefined;
}

interface getTraingingByProtocolParams {
  ProtocolIds: string | undefined;
}

interface getProtocolBySponsorParams {
  SponsorId : string | undefined;
}

interface GetUserByIdParams {
  UserId: string;
}

export const useGetUsers = (queryData : any) => useQuery({
  queryFn: getUsers,
  queryKey: ['users', queryData],
  retry: false
})
export const useGetUserById = (params: GetUserByIdParams) => useQuery({
  queryFn: getUserById,
  queryKey: ['userId', params],
  enabled: !!params.UserId,
  cacheTime: 0,
  retry: false
});

export const useGetUserDropdowns = () => useQuery({
  queryKey: ['userDropdowns'],
  queryFn: getUserDropdown,
  retry: false
})

export const useGetSiteDetailWithProtocol = (params: SiteDetailWithProtocolQueryParams) => useQuery({
  queryKey: ['siteDetailWithProtocol', params],
  queryFn: getSiteDetailWithProtocol,
  enabled: !!params.SiteId,
  cacheTime: 0,
  retry: false
}); 

export const useGetTrainingsByProtocol = (params: getTraingingByProtocolParams) => useQuery({
  queryKey: ['getTraingingsByProtocol', params],
  queryFn: getTrainingsByProtocol,
  enabled: !!params.ProtocolIds,
  retry: false
})

export const useGetProtocolsBySponsor = (params: getProtocolBySponsorParams) => useQuery({
  queryKey: ['getProtocolsBySponsor', params],
  queryFn: getProtocolBySponsor,
  enabled: !!params.SponsorId,
  retry: false
})

export const useGetDormantUsers = (queryData : any) => useQuery({
  queryFn: getDormantUsers,
  queryKey: ['sort', queryData],
  retry: false
})

export const useAddUser = () => useMutation({
  mutationFn: addUser,
})

export const useEditUser = () => useMutation({
  mutationFn: editUser,
})

export const useValidateUserName = () => useMutation({
  mutationFn: validateUserName,
})

export const useChangeTrainingStatus = () => useMutation({
  mutationFn: changeTrainingStatus,
})

export const useDeleteUser = () => useMutation({
  mutationFn: deleteUser
})

export const useDeleteDormantUsers = () => useMutation({
  mutationFn: deleteDormantUsers
})
