"use client";

import { CompanyCard } from "@/components/organisms";
import Pagination from "@/components/organisms/Pagination";
import {
  getCompanies,
  getCompanyTotalPagination,
} from "@/lib/feature/company/company.action";
import { CompanyWithIndustry } from "@/lib/feature/company/company.schema";
import {
  LoadingProvider,
  useLoading,
} from "@/share/providers/loadingContextProvider";
import { useEffect, useState } from "react";

function HomeContent() {
  const { loading, setLoading, error, setError } = useLoading();
  const [companies, setCompanies] = useState<CompanyWithIndustry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);

        const data = await getCompanies(currentPage, itemsPerPage);
        setCompanies(data);

        const pages = await getCompanyTotalPagination(itemsPerPage);
        setTotalPages(pages);
        console.log("Total Pages:", pages);
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container mx-auto max-w-screen-xl">
        {!loading && (
          <>
            <div className="flex flex-col gap-4">
              {companies.map((company) => (
                <CompanyCard
                  key={`company-${company.companyName}`}
                  data={company}
                />
              ))}
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Total Pages: <span className="font-bold">{totalPages}</span>
              </p>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
}

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}
