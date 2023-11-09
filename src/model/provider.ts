import { ReactNode } from "react";

export interface AuthSessionProviderProps {
  children: ReactNode;
  session: any;
}

export interface ReactQueryClientProviderProps {
  children: ReactNode;
}