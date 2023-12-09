import { create } from "zustand";

interface IStore {
  selectedNetwork: number;
  setSelectedNetwork: (networkIndex: number) => void;
}

const useStore = create<IStore>((set) => ({
  selectedNetwork: 0,

  setSelectedNetwork: (networkIndex) =>
    set({
      selectedNetwork: networkIndex,
    }),
}));

export { useStore };
