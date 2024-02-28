import { create } from 'zustand';
import { AdminDndData, DndDataItem, DndDataType } from './types/common';

type protocolListStore = {
    protocols?: any;
    initialSiteProtocolIds?: any
    initialSponsorProtocolIds?: any
    selectedProtocols: DndDataItem[]
    dndData?: any;
    adminDndData?: any;
    siteDetail?: any;
    addProtocols: (newList: any[]) => void;
    setProtocols: (newList: number[]) => void;
    setInitialSiteProtocolIds: (newList: number[]) => void;
    setSelectedProtocols: (newList: DndDataItem[]) => void;
    setDndData: (newDndData: DndDataType[]) => void;
    setSiteDetail: (newSiteDetail: any) => void;
    addAdminDndData: (newAdminDndData: AdminDndData) => void;
    setAdminDndData: (newAdminDndData: AdminDndData) => void;
}

const useProtocolListStore = create<protocolListStore>((set) => ({
    protocols: [],
    initialSiteProtocolIds: [],
    initialSponsorProtocolIds: [],
    selectedProtocols: [],
    dndData:[{
        title: 'Protocols',
        items: []
      },
      {
        title: 'selected',
        items: []
    }],
    adminDndData:{
        matchTypes: [{
          title: 'Match Type',
          items: []
        },
        {
          title: 'selected',
          items: []
        }],
        sites: [{
          title: 'Site',
          items: []
        },
        {
          title: 'selected',
          items: []
        }]
    },
    siteDetail: {},

    addProtocols: (newList) => set((state) => ({ protocols: newList })),
    setProtocols: (newProtocols) => set({ protocols: newProtocols }),
    setInitialSiteProtocolIds: (newInitialSiteProtocolIds) => set({ initialSiteProtocolIds: newInitialSiteProtocolIds }),
    setSelectedProtocols: (newSelectedProtocols) => set({ selectedProtocols: newSelectedProtocols }),
    setDndData: (newDndData) => set({ dndData: [...newDndData] }),
    setSiteDetail: (newSiteDetail) => set({ siteDetail: newSiteDetail }),
    addAdminDndData: (newAdminDndData) => set((state) => ({ adminDndData: {...state.adminDndData, matchTypes: newAdminDndData} })),
    setAdminDndData: (newAdminDndData) => set({ adminDndData: {...newAdminDndData} }),
}));


export default useProtocolListStore;