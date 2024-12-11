"use client";

import { CompanyCard } from "@/components/organisms";
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
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);

        const data = await getCompanies();
        setCompanies(data);

        const pages = await getCompanyTotalPagination();
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
  }, []);

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
