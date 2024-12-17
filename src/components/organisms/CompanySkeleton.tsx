import React from "react";

interface SkeletonProps {
  variant?: "full" | "column";
  className?: string;
}

export const CompanyCardSkeleton = ({
  variant = "column",
  className = "",
}: SkeletonProps) => (
  <div className="w-full">
    <div
      className={`${className} px-6 py-8 border shadow-drop-shadow-base border-[#DCDCDC] rounded-[12px] text-start animate-pulse`}
    >
      <div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      </div>
      <div
        className={`flex ${
          variant === "full" ? "flex-col mt-4" : "sm:flex-row flex-col mt-6"
        } justify-between text-start`}
      >
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className={`flex-1 ${variant === "full" ? "mt-4" : "sm:mt-0 mt-2"}`}>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
);
