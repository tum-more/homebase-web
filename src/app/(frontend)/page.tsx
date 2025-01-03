"use client";

import { Button, Input } from "@/components/ui";
import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import Image from "next/image";
import { useState } from "react";
import { SearchResultListView } from "./SearchResultListView";
import { CompanyListView } from "./CompanyListView";
import { encodeId, isEmptyString } from "@/share/helper/helper";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [finalSearch, setFinalSearch] = useState<string>("");
  const [isNotFoundData, setIsNotFoundData] = useState<boolean>(false);

  const handleSearch = async () => {
    setFinalSearch(search);
  };

  const handleToCompanyList = () => {
    const element = document.getElementById("result-list");
    const headerOffset = 75;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleTotalItemsChange = (items: number) => {
    setTotalItems(items);
    if (!isEmptyString(finalSearch) && items === 0) {
      setIsNotFoundData(true);
    } else {
      setIsNotFoundData(false);
    }
  };

  const handleToCompanyDetail = (id?: number) => {
    if (!id) return;
    const encodedId = encodeId(id);
    router.push(`/company/${encodedId}`);
  };

  return (
    <LoadingProvider>
      <main className="min-h-screen">
        <div className="container mx-auto max-w-screen-xl overflow-hidden relative w-full sm:h-[calc(100vh-51px)] flex flex-col sm:pt-0 pt-6 text-start sm:flex-row justify-between items-center">
          <div className="sm:pb-0 pb-12 max-w-[526px]">
            <p className="sm:text-heading-2 text-heading-4-black pb-2">
              Get to know your customers with forms worth filling out
            </p>
            <p className="text-body-3 text-gray-700 pb-8">
              Collect all the data you need to understand customers with forms
              designed to be refreshingly different
            </p>
            <Button
              onClick={handleToCompanyList}
              disabled={false}
              variant={"brand"}
              className="h-[48px]"
              iconLeft={
                <Image
                  src={"/images/icons/Chevron-right@3x.png"}
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

        <div className="container mx-auto max-w-screen-xl overflow-hidden relative w-full sm:pb-12 pb-10 sm:pt-0 pt-[72px]">
          <div className="sm:flex flex-col sm:items-center justify-center text-center sm:rounded-2xl sm:h-[452px] sm:bg-cover sm:bg-center sm:bg-[url('/images/back-ground-search.png')] sm:px-2 px-0">
            <p
              className="sm:text-heading-3 text-heading-5-black pb-4"
              style={{
                textShadow: "var(--shadow-drop-shadow-base)",
              }}
            >
              Discover the world-saving <br /> results we&apos;ve achieved
            </p>
            <p
              className="text-body-3 text-gray-700 pb-6"
              style={{
                textShadow: "var(--shadow-drop-shadow-base)",
              }}
            >
              Evaluated company directory.
            </p>
            <div className="flex flex-row w-full max-w-[778px] justify-center space-x-3 h-[60px]">
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search by company or product"
                className="pl-6 pr-6 h-[100%] text-ellipsis flex-1 text-body-3 border-solid border-[#dcdcdc]"
              />
              <Button
                onClick={handleSearch}
                variant={"brand"}
                className="h-[100%] w-auto"
                iconLeft={
                  <Image
                    src={"/images/icons/Search@3x.png"}
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
        <section id="result-list">
          {!!isNotFoundData && (
            <div className="container mx-auto max-w-screen-xl">
              <p className="text-gray-secondary">
                There’s 0 products and companies matching “{finalSearch}”:
              </p>
              <div className="flex flex-col items-center sm:pt-[164px] sm:pb-[340px] pt-[50px] pb-[150px]">
                <Image
                  src="/images/Isolation_Mode@3x.png"
                  alt="Isolation_Mode"
                  width={138}
                  height={136}
                />
                <h6 className="text-heading-6-bold !normal-case">
                  No search results found
                </h6>
                <p className="text-body-3 mt-2 text-gray-secondary">
                  Please try again with a different search query
                </p>
              </div>
            </div>
          )}

          {!isNotFoundData && (
            <div className="container mx-auto max-w-screen-xl mb-4 sm:mb-6">
              <p className="text-gray-secondary">
                Showing {totalItems} results
              </p>
            </div>
          )}

          {!isEmptyString(finalSearch) ? (
            <SearchResultListView
              search={finalSearch}
              onTotalItemsChange={handleTotalItemsChange}
              onPressCompany={(companyId) => handleToCompanyDetail(companyId)}
            />
          ) : (
            <CompanyListView
              onTotalItemsChange={handleTotalItemsChange}
              onPressCompany={(companyId) => handleToCompanyDetail(companyId)}
            />
          )}
        </section>
      </main>
    </LoadingProvider>
  );
}
