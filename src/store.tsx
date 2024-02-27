import { create } from 'zustand';
import { DndDataItem, DndDataType } from './types/common';

type protocolListStore = {
    protocols?: any;
    initialSiteProtocolIds?: any
    initialSponsorProtocolIds?: any
    selectedProtocols: DndDataItem[]
    dndData?: any;
    siteDetail?: any;
    addProtocols: (newList: any[]) => void;
    setProtocols: (newList: number[]) => void;
    setInitialSiteProtocolIds: (newList: number[]) => void;
    setSelectedProtocols: (newList: DndDataItem[]) => void;
    setDndData: (newDndData: DndDataType[]) => void;
    setSiteDetail: (newSiteDetail: any) => void;

}

const useProtocolListStore = create<protocolListStore>((set) => ({
    protocols: [],
    initialSiteProtocolIds: [],
    initialSponsorProtocolIds: [],
    selectedProtocols: [],
    dndData:[],
    siteDetail: {},

    addProtocols: (newList) => set((state) => ({ protocols: newList })),
    setProtocols: (newProtocols) => set({ protocols: newProtocols }),
    setInitialSiteProtocolIds: (newInitialSiteProtocolIds) => set({ initialSiteProtocolIds: newInitialSiteProtocolIds }),
    setSelectedProtocols: (newSelectedProtocols) => set({ selectedProtocols: newSelectedProtocols }),
    setDndData: (newDndData) => set({ dndData: [...newDndData] }),
    setSiteDetail: (newSiteDetail) => set({ siteDetail: newSiteDetail }),
}));


export default useProtocolListStore;