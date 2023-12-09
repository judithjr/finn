import { NextApiRequest, NextApiResponse } from "next";
import { createPublicClient, http, createWalletClient } from "viem";

interface RequestBody {
    address: `0x${string}`;
    contractAddress: `0x${string}`;
    chainID: number;
    amount: number
}

interface SuccessResponse {
    message: string;
}

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
    try {
        if (req.method !== "POST") {
            return res.status(400).json({ error: "Method not allowed" });
        }

        const ABI = [
            { name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "value", type: "uint256" }] },
        ] as const

        const { address, contractAddress, chainID, amount } = req.body as RequestBody;

        const publicClient = createPublicClient({
            transport: http(""),
        });

        const walletClient = createWalletClient({
            transport: http(""),
        });

        const hash = await walletClient.writeContract({
            abi: ABI,
            functionName: "approve",
            address: contractAddress,
            args: [address, amount],
            account: address,
            chain: undefined
        });

        await publicClient.waitForTransactionReceipt({
            hash: hash,
        });

        res.status(200).json({ message: hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
