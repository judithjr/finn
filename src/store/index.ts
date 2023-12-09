import { NetworkOptions, TokenOption, networkOptions, tokenOptions } from "@/utils/constants";
import { create } from "zustand";

interface IStore {
  selectedNetwork: NetworkOptions;
  proportion: string[]
  selectedTokens: TokenOption[]
  setSelectedNetwork: (network: NetworkOptions) => void;
  setSelectedTokens: (tokens: TokenOption[]) => void;
  setProportion: (proportion: string[]) => void;
}

const useStore = create<IStore>((set) => ({
  selectedNetwork: networkOptions[0],
  selectedTokens: tokenOptions[0],
  proportion: new Array(tokenOptions[0].length).fill("0"),
  setSelectedNetwork: (network) =>
    set({
      selectedNetwork: network,
    }),
  setSelectedTokens: (tokens) =>
    set({
      selectedTokens: tokens,
    }),
  setProportion: (proportion) =>
    set({
      proportion: proportion,
    }),
}));

export { useStore };
