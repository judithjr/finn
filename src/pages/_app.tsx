import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="min-h-[calc(100vh-68px)] pt-16 px-2 sm:px-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}
