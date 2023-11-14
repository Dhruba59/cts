"use client";
import { HubConnectionProviderProps, HubContextType } from "@/model/provider";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import getHubConnection, { createHubConnection } from "@/service/signalr-connection";

interface HubContextValues {
  connection: HubConnection;
  apiKey: string;
  hubUrl: string;
}
const HubConnectionContext = createContext<HubContextValues | undefined>(
  undefined
);

// Custom hook to use the context
export const useHubContext = (): HubContextValues => {
  const context = useContext(HubConnectionContext);
  if (!context) {
    throw new Error("useHubContext must be used within an HubContextProvider");
  }
  return context;
};

// Provider component
interface HubProviderProps {
  apiKey: string;
  hubUrl: string;
  children: ReactNode;
}
export const HubConnectionProvider: React.FC<HubProviderProps> = ({
  apiKey,
  hubUrl,
  children
}) => {
  //const [connection, setConnection] = useState<HubConnection | undefined>(undefined);
  const connection = getHubConnection(apiKey, hubUrl).connection;
  const hubContextValue: HubContextValues = {
    apiKey,
    hubUrl,
    connection
  };
  return (
    <HubConnectionContext.Provider value={hubContextValue}>
      {children}
    </HubConnectionContext.Provider>
  );
};
