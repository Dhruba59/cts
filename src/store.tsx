import { create } from 'zustand';

type protocolListStore = {
    protocols?: any;
    addProtocols: (newList: any[]) => void;

}

const useProtocolListStore = create<protocolListStore>((set) => ({
    protocols: [],
    addProtocols: (newList) =>
        set((state) => ({ protocols: newList })),
}));


export default useProtocolListStore;