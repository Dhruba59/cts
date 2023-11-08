import { ReactNode } from "react";

export interface AuthSessionProviderProps {
  children: ReactNode;
  session: any;
}