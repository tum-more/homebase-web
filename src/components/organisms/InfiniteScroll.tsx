"use client";

import { useEffect, useState } from "react";

interface Props {
  hasMore: boolean;
  children: React.ReactNode;
  fetchMoreData: (page: number) => Promise<any[]>;
}

export function InfiniteScroll(props: Props) {
  const { hasMore, children, fetchMoreData } = props;
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleScroll = () => {
    if (isLoading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadMore();
    }
  };

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const newData = await fetchMoreData(page + 1);
      if (newData.length > 0) {
        setPage((prev) => prev + 1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div>
      {children}

      {isLoading && (
        <div className="text-center py-4">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
    </div>
  );
}
