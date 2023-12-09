import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { GiWallet } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import Input from "./form-elements/input";

interface IBucket {
  name: string;
  desc: string;
}

interface IChip {
  name: string;
  uri: string;
}

const tokenDetails = [
  {
    id: 1,
    name: "ARB",
    address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    image:
      "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
  },
  {
    id: 2,
    name: "USDC",
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    image:
      "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
  },
  {
    id: 3,
    name: "USDT",
    address: "0x55d398326f99059ff775485246999027b3197955",
    image:
      "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
  },
];

const Chips = ({ name, uri }: IChip) => {
  return (
    <div className="flex flex-row p-2 px-6 bg-neutral-800 text-gray-200 justify-between rounded-lg">
      <div className="flex gap-2">
        <Image
          src={uri}
          className="rounded-full"
          alt="token"
          width={25}
          height={25}
        />
        {name}
      </div>
      <p className="text-teal-400">$ 461</p>
    </div>
  );
};

export default function Card({ name, desc }: IBucket) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
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
        <button
          type="button"
          onClick={openModal}
          className="flex flex-row w-[60%] md:w-[40%] gap-2 font=['Roobert'] justify-center items-center text-teal-300 bg-neutral-700 hover:bg-teal-400 hover:text-black py-1 px-1.5 rounded-3xl"
        >
          Deposit <GiWallet size={15} />
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 p-8 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="flex flex-row items-center justify-between text-2xl font-medium font-['trap'] leading-6 text-teal-400"
                    >
                      Bucket Details
                      <div
                        className="text-red-500 hover:cursor-pointer"
                        onClick={closeModal}
                      >
                        <MdOutlineCancel size={25} />
                      </div>
                    </Dialog.Title>
                    <div className="flex flex-col mt-2 font-['Roobert']">
                      <h1 className="font-semibold text-xl text-gray-200">
                        {name}
                      </h1>
                      <p className="text-md text-gray-400">{desc}</p>
                      <div className="flex flex-col gap-2 px-3 my-2">
                        {tokenDetails.map((token) => {
                          return (
                            <Chips
                              key={token.id}
                              name={token.name}
                              uri={token.image}
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-row items-end justify-center">
                        <div className="flex w-1/2">
                          <Input
                            id="amount"
                            name="amount"
                            label="Amount"
                            placeholder="Enter amount"
                            value={amount.toString()}
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex w-1/2">
                          <button className="flex w-full font=['Roobert'] font-semibold justify-center items-center border border-teal-400 bg-teal-400 hover:bg-teal-500 text-black p-2.5 px-4 rounded-xl">
                            Invest
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}
