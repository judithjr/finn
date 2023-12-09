import { NetworkOptions, TokenOption, networkOptions, tokenOptions } from "@/utils/constants";
import { create } from "zustand";

interface IStore {
  selectedNetwork: NetworkOptions;
  selectedNetworkTokens: number,
  selectedTokens: TokenOption[]
  setSelectedNetworkTokens: (tokenId: number) => void;
  setSelectedNetwork: (network: NetworkOptions) => void;
  setSelectedTokens: (tokens: TokenOption[]) => void;
}

const useStore = create<IStore>((set) => ({
  selectedNetwork: networkOptions[0],
  selectedNetworkTokens: 0,
  selectedTokens: tokenOptions[0],
  setSelectedNetworkTokens: (tokenId) =>
    set({
      selectedNetworkTokens: tokenId,
    }),
  setSelectedNetwork: (network) =>
    set({
      selectedNetwork: network,
    }),
  setSelectedTokens: (tokens) =>
    set({
      selectedTokens: tokens,
    }),
}));

export { useStore };
