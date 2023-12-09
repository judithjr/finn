import Card from "@/components/card";
import Head from "next/head";

const buckets = [
  {
    id: 1,
    name: "RWA - 2024",
    desc: "A case of RWA tokens like Render, tensor",
  },
  {
    id: 2,
    name: "RWA - 2024",
    desc: "A case of RWA tokens like Render, tensor",
  },
  {
    id: 3,
    name: "RWA - 2024",
    desc: "A case of RWA tokens like Render, tensor",
  },
  {
    id: 4,
    name: "RWA - 2024",
    desc: "A case of RWA tokens like Render, tensor",
  },
];

export default function Deposit() {
  return (
    <>
      <Head>
        <title>Invest</title>
        <meta name="description" content="Create Bucket - Finn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-5 p-5 md:p-10 md:px-44 items-center">
        <h1 className="font-['trap'] font-bold text-2xl md:text-3xl text-gray-200">
          Your buckets
        </h1>
        <div className="flex gap-5 flex-wrap">
          {buckets.map((bucket) => {
            return (
              <Card key={bucket.id} name={bucket.name} desc={bucket.desc} />
            );
          })}
        </div>
      </main>
    </>
  );
}
