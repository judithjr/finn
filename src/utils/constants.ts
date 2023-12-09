export const mumbaiAddress = "0xDC62a0f8C6a48A59C65Dd0aA6941E4b96634C2fE";

export type TokenOption = {
    name: string,
    contractAddress: `0x${string}`,
    logoURI: string,
}

export type NetworkOptions = {
    id: number,
    name: string
}

type TokenOptions = TokenOption[][]

const ARB: TokenOption[] = [
    {
        name: "WETH",
        contractAddress: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
        logoURI:
            "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    },
    {
        name: "WBTC",
        contractAddress: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
        logoURI:
            "https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
    },
    {
        name: "DAI",
        contractAddress: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
        logoURI:
            "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
    },
    {
        name: "LINK",
        contractAddress: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
        logoURI:
            "https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    },
    {
        name: "ETH",
        contractAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        logoURI:
            "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
    },
]

const BASE: TokenOption[] = [
    {
        name: "ETH",
        contractAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        logoURI:
            "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
    },
    {
        name: "WETH",
        contractAddress: "0x4200000000000000000000000000000000000006",
        logoURI:
            "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    },
    {
        name: "DAI",
        contractAddress: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
        logoURI:
            "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
    },
]

export const networkOptions: NetworkOptions[] = [
    {
        id: 0,
        name: "Arbitrum"
    }, {
        id: 1,
        name: "Base"
    }
];

export const tokenOptions: TokenOptions = [
    ARB,
    BASE,
];