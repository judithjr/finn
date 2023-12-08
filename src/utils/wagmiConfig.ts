import { configureChains, createConfig } from "wagmi";
import { arbitrum, base } from "wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

const supportedChains = [arbitrum, base];
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const { publicClient } = configureChains(
  // @ts-ignore
  supportedChains,
  [w3mProvider({ projectId: projectId })]
);

export const config = createConfig({
  autoConnect: true,
  // @ts-ignore
  connectors: w3mConnectors({ projectId: projectId, chains: supportedChains }),
  publicClient,
});
// @ts-ignore
export const ethereumClient = new EthereumClient(config, supportedChains);
