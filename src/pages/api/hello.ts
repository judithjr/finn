// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FusionSDK, NetworkEnum, PrivateKeyProviderConnector } from '@1inch/fusion-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPublicClient, http, webSocket } from 'viem'
import { mainnet } from 'viem/chains';
import Web3 from 'web3';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { fromTokenAddress, toTokenAddress, amount } = req.body;

  const makerPrivateKey = '0x123....'
  const makerAddress = '0x123....'

  const nodeUrl = '....'

  const blockchainProvider = new PrivateKeyProviderConnector(
    makerPrivateKey,
    new Web3(nodeUrl)
  )

  const sdk = new FusionSDK({
    url: 'https://api.1inch.dev/fusion',
    network: NetworkEnum.ETHEREUM,
    blockchainProvider,
    authKey: 'your-auth-key'
  })

  sdk.placeOrder({
    fromTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
    toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    amount: '50000000000000000', // 0.05 ETH
    walletAddress: makerAddress
  }).then(console.log)

  res.status(200).json({ name: 'John Doe' })
}
