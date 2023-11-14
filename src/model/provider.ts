import { HubConnection } from "@microsoft/signalr";
import { ReactNode } from "react";

export interface AuthSessionProviderProps {
  children: ReactNode;
  session: any;
}

export interface ReactQueryClientProviderProps {
  children: ReactNode;
}

export interface HubConnectionProviderProps {
  children: ReactNode;
  apiKey: string;
  HubAddress: string;
}

export interface HubContextType {
  apiKey: string;
  HubAddress: string;
}