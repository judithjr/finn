import { parseUnits } from "viem";
import { useSendTransaction } from "wagmi";

export default function useSendFunds() {
  const { sendTransactionAsync } = useSendTransaction();

  async function sendFunds(amount: string) {
    try {
      const { hash } = await sendTransactionAsync({
        to: "0x03a09604171896C385A79DfcE16B144a570967D5",
        value: parseUnits(amount, 6),
      });
      return hash;
    } catch (error) {
      console.log(error);
    }
  }
  return { sendFunds };
}
