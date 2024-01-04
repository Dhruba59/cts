
import { getUsers, getUserById, 
  getDormantUsers, addUser, editUser, deleteUser, deleteDormantUsers, getUserDropdown, getSiteDetailWithProtocol, getTrainingsByProtocol, getProtocolBySponsor, validateUserName 
} from "@/service/user-service";
import { UseQueryOptions, useMutation, useQuery } from "react-query";

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
})
export const useGetUserById = (params: GetUserByIdParams) => useQuery({
  queryFn: getUserById,
  queryKey: ['userId', params],
  enabled: !!params.UserId
});

export const useGetUserDropdowns = () => useQuery({
  queryFn: getUserDropdown,
})

export const useGetSiteDetailWithProtocol = (params: SiteDetailWithProtocolQueryParams) => useQuery({
  queryKey: ['siteDetailWithProtocol', params],
  queryFn: getSiteDetailWithProtocol,
  enabled: !!params.SiteId
}); 

export const useGetTrainingsByProtocol = (params: getTraingingByProtocolParams) => useQuery({
  queryKey: ['getTraingingsByProtocol', params],
  queryFn: getTrainingsByProtocol,
  enabled: !!params.ProtocolIds
})

export const useGetProtocolsBySponsor = (params: getProtocolBySponsorParams) => useQuery({
  queryKey: ['getProtocolsBySponsor', params],
  queryFn: getProtocolBySponsor,
  enabled: !!params.SponsorId
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
