import Navbar from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import { config, ethereumClient } from "@/utils/wagmiConfig";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={config}>
        <Navbar />
        <div className="min-h-[calc(100vh-68px)] pt-16 px-2 sm:px-4">
          <Component {...pageProps} />
        </div>
      </WagmiConfig>
      <Web3Modal
        projectId={""}
        ethereumClient={ethereumClient}
      />
    </>
  );
}

