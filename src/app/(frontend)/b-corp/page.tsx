import { Metadata } from "next";
import { LoadingProvider } from "./loadingContext";
import BCorpForm from "./_bcorp.form";

export default function BCorpScreen() {
  return (
    <LoadingProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1 className="text-xl sm:text-2xl text-center font-bold">
            B Corporation
          </h1>
          <BCorpForm />
        </main>
      </div>
    </LoadingProvider>
  );
}

export const metadata: Metadata = {
  title: "B Corporation",
};
