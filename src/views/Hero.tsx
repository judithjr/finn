import { ReactNode } from "react";
import { FaBucket } from "react-icons/fa6";
import { RiStockFill } from "react-icons/ri";
import { IoBriefcase } from "react-icons/io5";

interface CardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  content: string;
}

const Card = ({ icon, title, desc, content }: CardProps) => {
  return (
    <div className="w-full md:w-[32%] mb-2 m-5 sm:m-5 md:m-1 lg:m-1 bg-neutral-100/80 border border-violet-500 rounded-xl">
      <div className="flex flex-col px-8 py-10">
        <div className="flex flex-row gap-4 items-start">
          {icon}
          <div className="flex flex-col items-start">
            <h5 className="text-xl font-medium text-gray-900">{title}</h5>
            <span className="text-sm text-gray-500">{desc}</span>
          </div>
        </div>
        <div className="flex mt-2 space-x-3 mx-auto">
          <p className="py-2 text-sm text-gray-700 font-medium">{content}</p>
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
      "Mentored 463+ devs to get started in Web3 ecosystem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore sit officia ipsum omnis consequatur deserunt dolore qui, veniam tempore earum minus atque reiciendis, exercitationem error obcaecati nam temporibus expedita beatae.",
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
      "I'm using SyncX for better sales engagement with 72k+ CTR Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore sit officia ipsum omnis consequatur deserunt dolore qui, veniam tempore earum minus atque reiciendis, exercitationem error obcaecati nam temporibus expedita beatae.",
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
      "Increased 39% recursive client rate using SyncX Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore sit officia ipsum omnis consequatur deserunt dolore qui, veniam tempore earum minus atque reiciendis, exercitationem error obcaecati nam temporibus expedita beatae.",
  },
];

export default function Hero() {
  return (
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
  );
}
