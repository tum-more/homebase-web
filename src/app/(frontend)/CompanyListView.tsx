"use client";

import { CompanyCard } from "@/components/organisms";
import Pagination from "@/components/organisms/Pagination";
import { InfiniteScroll } from "@/components/organisms/InfiniteScroll";
import { getCompanies, getCompanyTotalPagination } from "@/lib/feature/company/company.action";
import { CompanyWithIndustry } from "@/lib/feature/company/company.schema";
import { useLoading } from "@/share/providers/loadingContextProvider";
import { useEffect, useState } from "react";

const mobileSize = 639;

const CompanyListView = () => {
  const { loading, setLoading, setError } = useLoading();
  const [companies, setCompanies] = useState<CompanyWithIndustry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

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
        setCompanies(initialData);

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
    try {
      setLoading(true);
      const data = await getCompanies(page, itemsPerPage);
      setCompanies(data);

      const pages = await getCompanyTotalPagination(itemsPerPage);
      setTotalPages(pages);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCompanyPagination(page);
  };

  const fetchMoreCompanies = async (page: number) => {
    try {
      const newCompanies = await getCompanies(page, itemsPerPage);
      setCompanies((prev) => [...prev, ...newCompanies]);
      setCurrentPage(page);
      return newCompanies;
    } catch (error) {
      setError("Failed to fetch more companies");
      console.error(error);
      return [];
    }
  };

  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= mobileSize;

  return (
    <div className="container mx-auto max-w-screen-xl mb-[62px] sm:mb-[119px]">
      {!loading && isClient && (
        <>
          {isMobile ? (
            <InfiniteScroll fetchMoreData={(page) => fetchMoreCompanies(page)} hasMore={currentPage < totalPages}>
              <div className="flex flex-col gap-4">
                {companies.map((company) => (
                  <CompanyCard key={`company-${company.companyName}`} data={company} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <>
              <div className="flex flex-col gap-4 mb-[56px]">
                {companies.map((company) => (
                  <CompanyCard key={`company-${company.companyName}`} data={company} />
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
};

export default CompanyListView;
