"use client";
import { HubConnectionProviderProps, HubContextType } from "@/model/provider";
import React, { ReactNode, createContext, useContext } from "react";
import { HubConnection } from "@microsoft/signalr";

interface EnvConfigValues {
  apiKey: string;
  hubUrl: string;
}
const EnvConfigContext = createContext<EnvConfigValues | undefined>(
  undefined
);

// Custom hook to use the context
export const useEnvConfigContext = (): EnvConfigValues => {
  const context = useContext(EnvConfigContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};

// Provider component
interface EnvConfigProviderProps {
  apiKey: string;
  hubUrl: string;
  children: ReactNode;
}
export const EnvConfigProvider: React.FC<EnvConfigProviderProps> = ({
  apiKey,
  hubUrl,
  children
}) => {
  const apiContextValue: EnvConfigValues = {
    apiKey,
    hubUrl
  };

  return (
    <EnvConfigContext.Provider value={apiContextValue}>
      {children}
    </EnvConfigContext.Provider>
  );
};
