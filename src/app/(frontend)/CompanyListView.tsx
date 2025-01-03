"use client";

import {
  CompanyCard,
  CompanyCardSkeleton,
  InfiniteScroll,
  Pagination,
} from "@/components/organisms";
import {
  getCompanies,
  getCompanyTotalPagination,
} from "@/lib/feature/company/company.action";
import { CompanyWithIndustry } from "@/lib/feature/company/company.schema";
import { useLoading } from "@/share/providers/loadingContextProvider";
import { useEffect, useState } from "react";

const mobileSize = 639;

interface Props {
  onTotalItemsChange?: (totalItems: number) => void;
  onPressCompany?: (companyId?: number) => void;
}

export function CompanyListView(props: Props) {
  const { loading, setLoading, setError } = useLoading();
  const [companies, setCompanies] = useState<CompanyWithIndustry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
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
    async function fetchInitialData() {
      try {
        setLoading(true);
        const initialData = await getCompanies(1, itemsPerPage);
        setCompanies(initialData.data);

        if (props?.onTotalItemsChange) {
          props?.onTotalItemsChange(initialData.totalItems ?? 0);
        }

        const pages = await getCompanyTotalPagination(itemsPerPage);
        setTotalPages(pages);
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (isClient) {
      fetchInitialData();
    }
  }, [isClient, itemsPerPage]);

  const fetchCompanyPagination = async (page: number) => {
    setIsPageLoading(true);
    try {
      const data = await getCompanies(page, itemsPerPage);
      setCompanies(data.data);

      const pages = await getCompanyTotalPagination(itemsPerPage);
      setTotalPages(pages);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    } finally {
      setIsPageLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsPageLoading(true);

    setTimeout(() => {
      fetchCompanyPagination(page);
    }, 300);

    const element = document.getElementById("company-section");
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

  const fetchMoreCompanies = async (page: number) => {
    try {
      const { data } = await getCompanies(page, itemsPerPage);
      setCompanies((prev) => [...prev, ...data]);
      setCurrentPage(page);
      return data;
    } catch (error) {
      setError("Failed to fetch more companies");
      console.error(error);
      return [];
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
              <CompanyCardSkeleton />
            </div>
          ))}
        </>
      ) : (
        <>
          {isMobile ? (
            <InfiniteScroll
              fetchMoreData={(page) => fetchMoreCompanies(page)}
              hasMore={currentPage < totalPages}
            >
              <div className="flex flex-col gap-4 mb-[56px]">
                {companies.map((company) => (
                  <CompanyCard
                    key={`company-${company.companyName}`}
                    data={company}
                    onPress={(id) => handleOnPressItem(id)}
                  />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <>
              <div
                id="company-section"
                className="flex flex-col gap-4 mb-[56px]"
              >
                {companies.map((company) => (
                  <CompanyCard
                    key={`company-${company.companyName}`}
                    data={company}
                    onPress={(id) => handleOnPressItem(id)}
                  />
                ))}
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
