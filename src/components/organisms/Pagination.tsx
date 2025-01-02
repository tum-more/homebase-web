import React from "react";
import { Button } from "../ui";
import Image from "next/image";

interface Props {
  currentPage: number;
  totalPages: number;
  className?: string;
  onPageChange: (page: number) => void;
}

export function Pagination(props: Props) {
  const { currentPage, totalPages, className, onPageChange } = props;

  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    const startPage = Math.max(
      2,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 2
      )
    );
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    pages.push(1);

    if (startPage > 2) {
      pages.push("ellipsis");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <>
      {totalPages > 1 ? (
        <div
          className={`${className} flex items-center justify-between gap-2 mt-4 border-t border-[#DCDCDC] py-4`}
        >
          <Button
            iconLeft={
              <Image
                src="/images/icons/Chevron-black-left@3x.png"
                alt="Previous"
                width={24}
                height={24}
              />
            }
            disabled={currentPage === 1}
            variant={"outline"}
            className="rounded-[8px] min-w-[124px] px-3 py-2 text-gray-900 bg-white-500 border-[#DCDCDC] active:text-gray-900 active:bg-white-500 disabled:text-gray-900 disabled:bg-white-100"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </Button>

          <div>
            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <span
                  key={`pagination-ellipsis-${index}`}
                  className="text-gray-600 px-2"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={`pagination-${page}`}
                  variant={"outline"}
                  className={`rounded-[8px] min-w-[40px] min-h-[40px] px-3 py-2 text-gray-600 bg-white-500 ${
                    currentPage === page ? "border-[#DCDCDC] text-gray-900" : ""
                  } active:text-gray-900 active:bg-white-500`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <Button
            iconRight={
              <Image
                src="/images/icons/Chevron-black-right@3x.png"
                alt="Next"
                width={24}
                height={24}
              />
            }
            disabled={currentPage === totalPages}
            variant={"outline"}
            className="rounded-[8px] min-w-[124px] px-3 py-2 text-gray-900 bg-white-500 border-[#DCDCDC] active:text-gray-900 active:bg-white-500 disabled:text-gray-900 disabled:bg-white-100"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
