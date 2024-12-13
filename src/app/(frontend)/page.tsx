"use client";

import { Button, Input } from "@/components/ui";
import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import CompanyListView from "./CompanyListView";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>();
  const searching = () => {
    console.log(search);
  }

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

        <div className="container mx-auto max-w-screen-xl overflow-hidden relative w-full sm:pb-12 pb-10 sm:pt-0 pt-[72px] ">
          <div
            className="bg-cover bg-center flex sm:items-center justify-center text-center h-[452px] sm:bg-cover sm:bg-center sm:bg-[url('/images/back-ground-search.png')]"
          >
            <div
              className="w-[778px] h-[210px]"
            >
              <p
                className="sm:text-heading-3 bold text-heading-5-bold pb-4"
                style={{
                  textShadow: "var(--shadow-drop-shadow-base)",
                }}
              >
                Discover the world-saving <br /> results we've achieved
              </p>
              <p
                className="text-body-3 text-gray-700 pb-6"
              >
                Evaluated company directory.
              </p>
              <div
                className="inline-flex w-full items-center space-x-3 h-[60px]"
              >
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by company or product"
                  className="pl-6 pr-6 h-[100%] sm:w-[635px] text-ellipsis"
                />
                <Button
                  onClick={searching}
                  disabled={false}
                  variant={"brand"}
                  className="h-[100%] w-auto"
                  iconLeft={
                    <Image
                      className="h-[24px] w-[24px]"
                      src={"/images/icons/Search.png"}
                      alt="get-started-search"
                      width={24}
                      height={24}
                    />
                  }
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompanyListView />
    </LoadingProvider>
  );
}
