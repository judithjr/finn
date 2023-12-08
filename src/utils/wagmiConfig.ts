import { configureChains, createConfig } from "wagmi";
import { arbitrum, base } from "wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

const supportedChains = [arbitrum, base];

const { publicClient } = configureChains(
  // @ts-ignore
  supportedChains,
  [w3mProvider({ projectId: "" })]
);

export const config = createConfig({
  autoConnect: true,
  // @ts-ignore
  connectors: w3mConnectors({ projectId: "", chains: supportedChains }),
  publicClient,
});
// @ts-ignore
export const ethereumClient = new EthereumClient(config, supportedChains);
