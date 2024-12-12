"use client";

import { Button } from "@/components/ui/button";
import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import CompanyListView from "./CompanyListView";
import Image from "next/image";

export default function Home() {
  return (
    <LoadingProvider>
      <div>
        <div className="relative w-full sm:h-[calc(100vh-71px)] bg-cover bg-center flex justify-between pt-6">
          <div className="container mx-auto max-w-screen-xl text-start flex sm:flex-row flex-col items-center">
            <div
              className="pb-12"
              >
              <p
                className="sm:text-heading-2 text-heading-4-bold bold pb-2"
              >
                Get to know your customers with forms worth filling out
              </p>
              <p
                className="text-body-3 text-gray-700 pb-8"
              >
                Collect all the data you need to understand customers with forms
                designed to be refreshingly different
              </p>
              <Button
                disabled={false}
                variant={"brand"}
                className="h-[48px]"
                iconLeft={
                  <Image
                    src={"/images/icons/Chevron-right.png"}
                    alt="get-started-back-arrow"
                    width={24}
                    height={24}
                  />
                }
              >
                Get Started
              </Button>
            </div>
            <img
              src="/images/Fixed-aspect-ratio-spacer.png"
              alt="get-product-certificate"
              className="w-[588px]"
            />
          </div>
        </div>
      </div>
      <CompanyListView />
    </LoadingProvider>
  );
}
