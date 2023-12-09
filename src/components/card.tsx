import Image from "next/image";
import { GiWallet } from "react-icons/gi";

interface IBucket {
  name: string;
  desc: string;
}

export default function Card({name, desc}: IBucket) {
  return (
    <div className="flex flex-col w-76 p-5 font-['Roobert'] bg-neutral-800 border border-teal-400 rounded-lg">
      <h1 className="text-gray-200">{name}</h1>
      <p className="text-gray-400">{desc}</p>
      <div className="flex flex-row justify-between mt-2">
        <div className="flex items-center ml-3">
          <Image
            className="w-8 h-8 -ml-3 rounded-full"
            src="https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png"
            alt=""
            height={150}
            width={150}
          />
          <Image
            className="w-8 h-8 -ml-3 rounded-full"
            src="https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png"
            alt=""
            height={150}
            width={150}
          />
        </div>
        <button className="flex flex-row w-[60%] md:w-[40%] gap-2 font=['Roobert'] justify-center items-center text-teal-300 bg-neutral-700 hover:bg-teal-400 hover:text-black py-1 px-1.5 rounded-3xl">
          Deposit <GiWallet size={15} />
        </button>
      </div>
    </div>
  );
}
