import Card from "@/components/card";
import finnABI from "@/utils/contract/finnABI.json";
import { useContractRead } from "wagmi";

export default function ShowBucket({ address }: { address: string }) {
  const { data: name } = useContractRead({
    address: address as `0x${string}`,
    abi: finnABI,
    functionName: "name",
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      console.log("fetched", data);
    },
  });

  const { data: description } = useContractRead({
    address: address as `0x${string}`,
    abi: finnABI,
    functionName: "description",
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      console.log("fetched", data);
    },
  });

  return <Card key={name} name={name} desc={description} />;
}
