"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingProvider } from "@/share/providers/loadingContextProvider";
import CompanyListView from "./CompanyListView";
import Image from "next/image";

export default function Home() {
  return (
    <LoadingProvider>
      <div>
        <div className="relative w-full sm:h-[calc(100vh-71px)] bg-cover bg-center flex items-center justify-between">
          <div className="container mx-auto max-w-screen-xl text-start flex sm:flex-row flex-col items-center">
            <div>
              <p
                className="sm:text-heading-2 text-heading-4-bold bold"
                style={{
                  paddingBottom: "var(--spacing-2)",
                }}
              >
                Get to know your customers with forms worth filling out
              </p>
              <p
                className="text-body-3"
                style={{
                  color: "var(--colors-gray-700)",
                  paddingBottom: "var(--spacing-8)",
                }}
              >
                Collect all the data you need to understand customers with forms
                designed to be refreshingly different
              </p>
              <Button
                disabled={false}
                variant={"brand"}
                style={{
                  height: "48px",
                }}
                iconLeft={
                  <Image
                    src={"/images/icons/Chevron-right.png"}
                    alt=""
                    width={24}
                    height={24}
                  />
                }
              >
                Get Started
              </Button>
            </div>
            <img
              src="/images/mock/Fixed-aspect-ratio-spacer.png"
              alt=""
              style={{ width: "588px" }}
            />
          </div>
        </div>
      </div>
      <CompanyListView />
    </LoadingProvider>
  );
}
