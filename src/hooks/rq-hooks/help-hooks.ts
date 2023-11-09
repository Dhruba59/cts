'use client';
import { postHelpQuery } from "@/service/help-service";
import { useMutation } from "react-query";

export const useHelpMutation = () => useMutation({
  mutationFn: postHelpQuery,
})