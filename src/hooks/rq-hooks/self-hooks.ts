
import { change_password, match_current_password } from "@/service/self-service";
import { useMutation } from "react-query";

export const useChangePasswordMutation = () => useMutation({
  mutationFn: change_password,
})

export const useMatchPasswordMutation = () => useMutation({
  mutationFn: match_current_password,
})