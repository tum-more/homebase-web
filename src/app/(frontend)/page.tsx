"use client";

import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import CompanyListView from "./CompanyListView";

export default function Home() {
  return (
    <LoadingProvider>
      {/* TODO: Banner */}
      <CompanyListView />
    </LoadingProvider>
  );
}
