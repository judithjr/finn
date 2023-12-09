import { ReactNode } from "react";
import { FaBucket } from "react-icons/fa6";
import { RiStockFill } from "react-icons/ri";
import { IoBriefcase } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  content: string;
}

const Card = ({ icon, title, desc, content }: CardProps) => {
  return (
    <div className="w-full md:w-[32%] mb-2 m-5 sm:m-5 md:m-1 lg:m-1 bg-neutral-100/90 border border-violet-500 rounded-xl">
      <div className="flex flex-col px-8 py-10">
        <div className="flex flex-row gap-4 items-start">
          {icon}
          <div className="flex flex-col items-start">
            <h5 className="text-xl font-medium text-gray-900">{title}</h5>
            <span className="text-sm text-gray-500">{desc}</span>
          </div>
        </div>
        <div className="flex mt-2 space-x-3 mx-auto">
          <p className="py-2 text-md text-gray-700 font-medium">{content}</p>
        </div>
      </div>
    </div>
  );
};

const cardData = [
  {
    id: 1,
    icon: (
      <FaBucket
        className="mb-3 p-3 border border-violet-500 rounded-full shadow-xl text-violet-700"
        size={50}
      />
    ),
    title: "Bucket of tokens",
    desc: "Get incentives on bucket usage",
    content:
      "List of tokens providing balanced good return on risky portfolio and owner can be incentivized for their bucket usage.",
  },

  {
    id: 2,
    icon: (
      <RiStockFill
        className="mb-3 p-3 border border-violet-500 rounded-full shadow-xl text-violet-700"
        size={50}
      />
    ),
    title: "Improved UX",
    desc: "Gasless txn in single deposit",
    content:
      "Using 1inch Fusion API, it allocates the deposited amount through swap with gasless transaction.",
  },
  {
    id: 3,
    icon: (
      <IoBriefcase
        className="mb-3 p-3 border border-violet-500 rounded-full shadow-xl text-violet-700"
        size={50}
      />
    ),
    title: "Manage portfolio",
    desc: "Invest in a bucket of tokens",
    content:
      "Avoid micro-management by using Finn bucket feature and invest in bucket with higher returns",
  },
];

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-12">
      <div className="ramp md:text-left h-[calc(90vh-60px)] flex flex-col md:flex-row justify-center md:ml-28 lg:mt-0 md:mt-0 sm:mt-24">
        <div className="flex flex-col font-['Roobert'] justify-center m-5 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block font-['trap'] bg-gradient-to-r from-teal-200 to-teal-400 text-transparent bg-clip-text pb-4">
              Finn
            </span>
            <span className="block text-teal-500 text-2xl font-medium tracking-tight">
              Create bucket of tokens and diversify your portfolio efficiently
            </span>
          </h1>
          <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0 text-gray-400">
            Hand-in-hand with creating buckets consisting of tokens on multiple
            networks and investing in buckets with good market performance
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center md:justify-start lg:justify-start flex-row">
            <div>
              <Link
                href="/invest"
                className="w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-3xl text-white bg-neutral-800 hover:bg-teal-400 hover:text-neutral-800"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
        <div className="my-auto w-full md:w-[60%] sm:w-[70%] sm:mx-auto items-end">
          <div className="relative">
            <Image
              src="/asset.png"
              width="550"
              height="500"
              alt="ProfileVector"
            />
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="flex flex-col text-center w-full">
          <h1 className="text-3xl mb-4 text-neutral-200 font-['Roobert'] font-medium title-font">
            Top features
          </h1>
        </div>
        <div className="flex flex-wrap md:px-44">
          {cardData.map((card) => (
            <Card
              key={card.id}
              icon={card.icon}
              title={card.title}
              desc={card.desc}
              content={card.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
