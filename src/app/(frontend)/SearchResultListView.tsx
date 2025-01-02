"use client";

import {
  CompanyCard,
  CompanyCardSkeleton,
  InfiniteScroll,
  Pagination,
  ProductCard,
  ProductCardSkeleton,
} from "@/components/organisms";
import { searchCompanyOrProduct } from "@/lib/feature/company/company.action";
import { SearchCompanyOrProduct } from "@/lib/feature/company/company.schema";
import { useLoading } from "@/share/providers/loadingContextProvider";
import { useEffect, useState } from "react";

const mobileSize = 639;

interface Props {
  search: string;
  onTotalItemsChange: (totalItems: number) => void;
  onPressCompany?: (companyId?: number) => void;
}

export function SearchResultListView(props: Props) {
  const { loading, setLoading, setError } = useLoading();
  const [data, setData] = useState<SearchCompanyOrProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= mobileSize) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(8);
      }
      setCurrentPage(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const {
          data: fetchedData,
          totalItems,
          totalPages,
        } = await searchCompanyOrProduct(
          props.search,
          currentPage,
          itemsPerPage
        );
        setData(fetchedData);
        setTotalPages(totalPages ?? 0);
        props.onTotalItemsChange(totalItems ?? 0);
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (isClient) {
      fetchData();
    }
  }, [isClient, props.search, itemsPerPage]);

  const fetchMoreData = async (page: number) => {
    try {
      const { data: fetchedData } = await searchCompanyOrProduct(
        props.search,
        page,
        itemsPerPage
      );
      if (isMobile) {
        setData((prev) => [...prev, ...fetchedData]);
      } else {
        setData(fetchedData);
      }
      setCurrentPage(page);
      setIsPageLoading(false);
      return fetchedData;
    } catch (error) {
      setError("Failed to fetch more companies");
      console.error(error);
      return [];
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsPageLoading(true);

    setTimeout(() => {
      fetchMoreData(page);
    }, 300);

    const element = document.getElementById("search-result-section");
    const headerOffset = 130;
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

  const handleOnPressItem = (id?: number) => {
    if (props.onPressCompany) {
      props.onPressCompany(id);
    }
  };

  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= mobileSize;

  return (
    <div className="container mx-auto max-w-screen-xl mb-[71px] sm:mb-[119px]">
      {isPageLoading || loading || !isClient ? (
        <>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div className="mt-4 mb-4" key={index}>
              {index % 2 === 0 ? (
                <CompanyCardSkeleton />
              ) : (
                <ProductCardSkeleton />
              )}
              {/* <CompanyCardSkeleton /> */}
            </div>
          ))}
        </>
      ) : (
        <>
          {isMobile ? (
            <InfiniteScroll
              fetchMoreData={(page) => fetchMoreData(page)}
              hasMore={currentPage < totalPages}
            >
              <div className="flex flex-col gap-4">
                {data.map((item, index) =>
                  item.company ? (
                    <CompanyCard
                      key={`company-${index}`}
                      data={item.company}
                      onPress={(id) => handleOnPressItem(id)}
                    />
                  ) : item.product ? (
                    <ProductCard
                      key={`product-${index}`}
                      product={item.product}
                      onPress={(id) => handleOnPressItem(id)}
                    />
                  ) : null
                )}
              </div>
            </InfiniteScroll>
          ) : (
            <>
              <div
                id="search-result-section"
                className="flex flex-col gap-4 mb-[56px]"
              >
                {data.map((item, index) =>
                  item.company ? (
                    <CompanyCard
                      key={`company-${index}`}
                      data={item.company}
                      onPress={(id) => handleOnPressItem(id)}
                    />
                  ) : item.product ? (
                    <ProductCard
                      key={`product-${index}`}
                      product={item.product}
                      onPress={(id) => handleOnPressItem(id)}
                    />
                  ) : null
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
