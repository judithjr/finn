import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

import { WagmiConfig } from 'wagmi';
import { arbitrum, base, mainnet, polygon } from 'viem/chains';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '33e28c5d43009b3668cccf62984e6dbe';

// 2. Create wagmiConfig
const metadata = {
  name: 'FINN',
  description: 'FINN',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [arbitrum, base, polygon];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: mainnet,
  themeMode: 'dark',
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
