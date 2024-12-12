"use client";

import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import CompanyListView from "./CompanyListView";
import { ProductCard } from "@/components/organisms/ProductCard";

export default function Home() {
  return (
    <LoadingProvider>
      {/* TODO: Banner */}
      <div className="container mx-auto max-w-screen-xl m-4">
        <ProductCard />
      </div>
      <CompanyListView />
    </LoadingProvider>
  );
}
