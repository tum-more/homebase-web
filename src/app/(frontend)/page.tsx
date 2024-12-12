"use client";

import { Button } from "@/components/ui";
import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import CompanyListView from "./CompanyListView";
import Image from "next/image";

export default function Home() {
  return (
    <LoadingProvider>
      <div>
        <div className="container mx-auto max-w-screen-xl overflow-hidden relative w-full sm:h-[calc(100vh-51px)] flex flex-col sm:pt-0 pt-6 text-start sm:flex-row justify-between items-center">
            <div className="sm:pb-0 pb-12 max-w-[526px]">
              <p className="sm:text-heading-2 text-heading-4-bold bold pb-2">
                Get to know your customers with forms worth filling out
              </p>
              <p className="text-body-3 text-gray-700 pb-8">
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
            <Image
              src="/images/Fixed-aspect-ratio-spacer.png"
              alt="get-product-certificate"
              width={588}
              height={588}
            />
        </div>
      </div>
      <CompanyListView />
    </LoadingProvider>
  );
}
