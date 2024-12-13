"use client";

import { Button } from "@/components/ui";
import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { searchCompanyOrProduct } from "@/lib/feature/company/company.action";
import { SearchResultListView } from "./SearchResultListView";
import { CompanyListView } from "./CompanyListView";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleToCompanyList = () => {
    const element = document.getElementById("result-list");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  const handleSearch = async () => {
    try {
      setSearch("Bang");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleTotalItemsChange = (items: number) => {
    setTotalItems(items);
  };

  return (
    <LoadingProvider>
      <div className="container mx-auto max-w-screen-xl overflow-hidden w-full sm:h-[calc(100vh-51px)] flex flex-col sm:pt-0 pt-6 text-start sm:flex-row justify-between items-center">
        <div className="sm:pb-0 pb-12 max-w-[526px]">
          <p className="sm:text-heading-2 text-heading-4-bold pb-2">
            Get to know your customers with forms worth filling out
          </p>
          <p className="text-body-3 text-gray-700 pb-8">
            Collect all the data you need to understand customers with forms
            designed to be refreshingly different
          </p>
          <Button
            onClick={handleToCompanyList}
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
      <Button variant={"brand"} onClick={handleSearch}>
        handleSearch
      </Button>
      <section id="result-list" className="pt-12">
        <div className="container mx-auto max-w-screen-xl pb-2">
          <p className="text-gray-secondary">Showing {totalItems} results</p>
        </div>
        {search != null && !!search ? (
          <SearchResultListView
            search={search}
            onTotalItemsChange={handleTotalItemsChange}
          />
        ) : (
          <CompanyListView onTotalItemsChange={handleTotalItemsChange} />
        )}
      </section>
    </LoadingProvider>
  );
}
