"use client";
import {
  CompanyCard,
  CompanyCardSkeleton,
  InfiniteScroll,
  NotFoundView,
  Pagination,
  ProductCard,
  ProductCardSkeleton,
} from "@/components/organisms";
import { ProductData } from "@/lib/feature/categorize/categorize-data.schema";
import {
  getCompanyById,
  getProductsByCompanyId,
} from "@/lib/feature/company/company.action";
import { CompanyWithIndustry } from "@/lib/feature/company/company.schema";
import { decodeId, isEmptyString } from "@/share/helper/helper";
import {
  LoadingProvider,
  useLoading,
} from "@/share/providers/loadingContextProvider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const mobileSize = 639;
function Product() {
  const { id } = useParams();
  const { loading, setLoading, setError } = useLoading();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [company, setCompany] = useState<CompanyWithIndustry | null>(null);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductData[]>([]);
  const [encodeId, setEncodeId] = useState<number | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

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
    const decodedId: number | null = decodeId(id.toString());
    setEncodeId(decodedId);
    if (isEmptyString(id.toString()) || isEmptyString(decodedId?.toString())) {
      return;
    }

    async function fetchInitialData() {
      try {
        setLoading(true);
        const initialData = await getCompanyById(decodedId!);
        setCompany(initialData);

        const { data: products, totalPages } = await getProductsByCompanyId(
          decodedId!,
          currentPage,
          itemsPerPage
        );
        setData(products);
        setCurrentPage(currentPage);
        setTotalPages(totalPages ?? 0);
      } catch (error) {
        setIsNotFound(true);
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (isClient) {
      fetchInitialData();
    }
  }, [isClient, id, itemsPerPage]);

  const fetchMoreData = async (page: number) => {
    try {
      const { data: fetchedData } = await getProductsByCompanyId(
        encodeId!,
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

    const element = document.getElementById("browse-the-product");
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

  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= mobileSize;

  if (isNotFound && company === null) {
    return <NotFoundView />;
  }

  return (
    <main className="min-h-screen container mx-auto max-w-screen-xl overflow-hidden">
      {isPageLoading || loading || !isClient ? (
        <div className="flex sm:flex-row flex-col pb-[90px]">
          <div className="sm:w-[220px] w-full">
            <>
              <div className="mt-4 mb-4" key={"company-single-skeleton"}>
                <CompanyCardSkeleton
                  variant="full"
                  className="bg-[#F8F7F7] !border-0 !shadow-none relative sm:fixed sm:w-[220px] w-full sm:top-[calc(98px)] sm:mt-0 mt-6"
                />
              </div>
            </>
          </div>
          <div className="flex-1 ml-0 sm:ml-[27px] pt-12">
            <h4 className="text-heading-4-bold !normal-case text-center mb-[28px]">
              Browse the Product
            </h4>
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div className="mt-4 mb-4" key={index}>
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {company && (
            <div className="flex sm:flex-row flex-col pb-[90px]">
              <div className="sm:w-[220px] w-full">
                <CompanyCard
                  key={"company"}
                  data={company}
                  variant="full"
                  className="bg-[#F8F7F7] !border-0 !shadow-none relative sm:fixed sm:w-[220px] w-full sm:top-[calc(98px)] sm:mt-0 mt-6"
                />
              </div>
              <div className="flex-1 ml-0 sm:ml-[27px] pt-12">
                <h4
                  id="browse-the-product"
                  className="text-heading-4-bold !normal-case text-center mb-[28px]"
                >
                  Browse the Product
                </h4>
                {isMobile ? (
                  <InfiniteScroll
                    fetchMoreData={(page) => fetchMoreData(page)}
                    hasMore={currentPage < totalPages}
                  >
                    <div className="flex flex-col gap-4">
                      {data.map((item, index) => (
                        <ProductCard key={`product-${index}`} product={item} />
                      ))}
                    </div>
                  </InfiniteScroll>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 mb-[56px]">
                      {data.map((item, index) => (
                        <ProductCard key={`product-${index}`} product={item} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <LoadingProvider>
      <Product />
    </LoadingProvider>
  );
}
