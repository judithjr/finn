import { useContractRead, useAccount } from 'wagmi';
import { mumbaiAddress } from '@/utils/constants';
import finnABI from '@/utils/contract/finnABI.json';
import { FC, useEffect, useState } from 'react';
import Card from '@/components/card';

export default function showBucket({ address }: { address: string }) {
  const { data: name } = useContractRead({
    address: address as `0x${string}`,
    abi: finnABI,
    functionName: 'name',
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: (data: any) => {
      console.log('fetched', data);
    },
  });

  const { data: description } = useContractRead({
    address: address as `0x${string}`,
    abi: finnABI,
    functionName: 'description',
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: (data: any) => {
      console.log('fetched', data);
    },
  });

  return <Card key={name} name={name} desc={description} />;
}
