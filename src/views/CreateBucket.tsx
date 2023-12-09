import { useState, Fragment, Key } from "react";
import { useStore } from "@/store";
import Input from "@/components/form-elements/input";
import { Listbox, Switch, Transition } from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import factoryABI from "@/utils/contract/factoryABI.json";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { mumbaiAddress, networkOptions, tokenOptions } from "@/utils/constants";
import Image from "next/image";
import Chip from "@/components/Chip";

export default function CreateBucket() {
  const [bucketName, setBucketName] = useState("");
  const [bucketDesc, setBucketDesc] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const {
    selectedNetwork,
    setSelectedNetwork,
    selectedTokens,
    setSelectedTokens,
    setProportion,
  } = useStore();

  const { config } = usePrepareContractWrite({
    address: mumbaiAddress,
    abi: factoryABI,
    functionName: "createBucket",
    args: [
      0,
      isPublic,
      0, //duration
      [],
      [100],
      ["arb"],
      bucketName,
      bucketDesc,
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
        <Listbox
          value={selectedNetwork}
          onChange={(value) => {
            setSelectedNetwork(value);
            setSelectedTokens(tokenOptions[value.id]);
          }}
        >
          <label className="text-teal-100 font-['Roobert'] text-md">
            Select Network
          </label>
          <div className="relative -mt-3">
            <Listbox.Button className="relative w-full cursor-default rounded-lg font-['Roobert'] text-gray-200 bg-neutral-800 py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedNetwork.name}</span>
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md font-['Roobert'] bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                {networkOptions.map((network, networkIdx) => (
                  <Listbox.Option
                    key={networkIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-neutral-900 text-teal-300"
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
                          {network.name}
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
        <Listbox
          value={selectedTokens}
          onChange={(value) => {
            setSelectedTokens(value);
            const arr = new Array(value.length).fill(0);
            setProportion(arr);
          }}
          multiple
        >
          <label className="text-teal-100 font-['Roobert'] text-md">
            Select Tokens
          </label>
          <div className="relative -mt-3">
            <Listbox.Button className="relative w-full cursor-default rounded-lg font-['Roobert'] text-gray-200 bg-neutral-800 py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selectedTokens.map((token) => token.name).join(", ")}
              </span>
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md font-['Roobert'] bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                {tokenOptions[selectedNetwork.id].map((token, tokenIdx) => (
                  <Listbox.Option
                    key={tokenIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-neutral-900 text-teal-300"
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
                          {token.name}
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
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {selectedTokens.map((token, index) => (
            <Chip
              key={index}
              name={token.name}
              url={token.logoURI}
              index={index}
            />
          ))}
        </div>
        <div className="flex flex-row gap-4 font-['Roobert'] p-2 items-center">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-teal-400" : "bg-neutral-700"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className={`${enabled ? "text-teal-200" : "text-gray-200"}`}>
            Make it public & Earn 💰
          </span>
        </div>
        <div className="flex mt-2 items-center justify-center">
          <button
            onClick={() => {
              // write?.();
              console.log("data", selectedTokens);
            }}
            className="flex flex-row w-full gap-2 font=['Roobert'] font-medium justify-center items-center border border-teal-400 bg-teal-400 hover:bg-teal-500 text-black p-2 px-4 rounded-3xl"
          >
            Create bucket
          </button>
        </div>
      </div>
    </main>
  );
}
