import React from "react";

export const CompanyCardSkeleton = () => (
  <div className="px-6 py-8 border shadow-drop-shadow-base border-[#DCDCDC] rounded-[12px] text-start animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

    <div className="flex sm:flex-row flex-col justify-between text-start mt-6">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      <div className="flex-1 pt-1 sm:pt-0">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  </div>
);
