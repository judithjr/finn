import { useState, Fragment, Key } from "react";
import { useStore } from "@/store";
import Input from "@/components/form-elements/input";
import { Listbox, Transition } from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import factoryABI from "@/utils/contract/factoryABI.json";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { mumbaiAddress } from "@/utils/constants";
import Image from "next/image";

const networkOptions = ["Arbitrum", "Base"];
const tokenOptions = [
  [
    {
      name: "ARB",
      value: "0x912ce59144191c1204e64559fe8253a0e49e6548",
      logoURI:
        "https://tokens.1inch.io/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1.png",
    },
    {
      name: "WETH",
      value: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      logoURI:
        "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    },
    {
      name: "WBTC",
      value: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      logoURI:
        "https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
    },
    {
      name: "DAI",
      value: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      logoURI:
        "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
    },
    {
      name: "LINK",
      value: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
      logoURI:
        "https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png",
    },
    {
      name: "ETH",
      value: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      logoURI:
        "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
    },
  ],
  [
    {
      name: "ETH",
      value: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      logoURI:
        "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
    },
    {
      name: "WETH",
      value: "0x4200000000000000000000000000000000000006",
      logoURI:
        "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    },
    {
      name: "BASE",
      value: "0x0bf0ba3962a189d56f358143f38b7ffd26b8d48f",
      logoURI:
        "https://tokens.1inch.io/0x07150e919b4de5fd6a63de1f9384828396f25fdc.png",
    },
    {
      name: "DAI",
      value: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
      logoURI:
        "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
    },
  ],
];

export default function CreateBucket() {
  const [bucketName, setBucketName] = useState("");
  const [bucketDesc, setBucketDesc] = useState("");
  const [network, setNetwork] = useState(networkOptions[0]);
  const [token, setToken] = useState(tokenOptions[0]);
  const { selectedNetwork, setSelectedNetwork } = useStore();

  const { config } = usePrepareContractWrite({
    address: mumbaiAddress,
    abi: factoryABI,
    functionName: "createBucket",
    args: [
      1000, //total value,
      false, //public,
      10, //locked time duration,
      ["0x2da724Bf044a7a0eb2e427ba35E3cD65B91C8beF"], //token addresses,
      [100],
      ["arb"], //token weights,
      "bucketName", //name,
      "bucketDesc", //description,
    ],

    onError: (error) => {
      console.log("Error", error);
    },
    onSuccess: (result) => {
      console.log("Success", result);
    },
  });

  const { data, write, error } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });
  return (
    <main className="flex p-5 justify-center items-center">
      <div className="flex flex-col w-[100%] md:w-[30%] gap-4 p-10 border border-gray-400 rounded-2xl">
        <h1 className="flex items-center justify-center text-2xl text-teal-200 font-bold font-['trap']">
          Create Bucket
        </h1>
        <Input
          id="bucketName"
          name="bucketname"
          label="Name your bucket"
          placeholder="RWA - 2023"
          value={bucketName}
          onChange={(e) => {
            setBucketName(e.target.value);
          }}
        />
        <Input
          id="bucketDesc"
          name="bucketdesc"
          label="Description"
          placeholder="Invest in Real World Asset Realm"
          value={bucketDesc}
          onChange={(e) => {
            setBucketDesc(e.target.value);
          }}
        />
        <Listbox value={network} onChange={setNetwork}>
          <label className="text-teal-100 font-['Roobert'] text-md">
            Select Network
          </label>
          <div className="relative -mt-3">
            <Listbox.Button className="relative w-full cursor-default rounded-lg font-['Roobert'] text-gray-200 bg-neutral-700 py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{network}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <IoChevronDownOutline
                  className="h-5 w-5 text-gray-200"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md font-['Roobert'] bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {networkOptions.map((network, networkIdx) => (
                  <Listbox.Option
                    key={networkIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-neutral-800 text-teal-300"
                          : "text-gray-200"
                      }`
                    }
                    value={network}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {network}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
                            <FaCheck className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {/* {network && network === "Arbitrum" ? (
          <Listbox value={token} onChange={setToken}>
            <label className="text-teal-100 font-['Roobert'] text-md">
              Select Tokens
            </label>
            <div className="relative -mt-3">
              <Listbox.Button className="relative w-full cursor-default rounded-lg font-['Roobert'] text-gray-200 bg-neutral-700 py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{token[0].name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IoChevronDownOutline
                    className="h-5 w-5 text-gray-200"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md font-['Roobert'] bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {tokenOptions.map((token, tokenIdx) => (
                    <Listbox.Option
                      key={tokenIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-neutral-800 text-teal-300"
                            : "text-gray-200"
                        }`
                      }
                      value={token}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {token[0].name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
                              <FaCheck className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        ) : null} */}
        <div>
          {tokenOptions[0].map((token) => {
            return (
              <div className="flex w-32" key={token.name}>
                <span className="inline-flex items-center px-2 gap-1 text-sm text-gray-200 bg-neutral-700 border rounded-e-0 border-teal-400 rounded-s-md">
                  <Image
                    src={token.logoURI}
                    className="border border-teal-400 rounded-full"
                    alt="token"
                    width={20}
                    height={20}
                  />
                  {token.name}
                </span>
                <input
                  type="text"
                  id="allocation"
                  className="rounded-none rounded-e-lg bg-neutral-700 border text-gray-200 focus:ring-teal-400 focus:border-teal-400 block flex-1 min-w-0 w-full text-sm border-teal-400 p-2.5"
                  placeholder="10%"
                />
              </div>
            );
          })}
        </div>

        <div className="flex mt-2 items-center justify-center">
          <button
            onClick={() => {
              write?.();
              // console.log("data", data);
            }}
            className="flex flex-row w-[60%] md:w-[50%] gap-2 font=['Roobert'] justify-center items-center text-teal-300 bg-neutral-700 border border-teal-400 hover:bg-teal-400 hover:text-black p-2 px-4 rounded-3xl"
          >
            Create bucket
          </button>
        </div>
      </div>
    </main>
  );
}
