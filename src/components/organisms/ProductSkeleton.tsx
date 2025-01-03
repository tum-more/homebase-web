import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="px-6 py-8 border shadow-drop-shadow-base border-[#DCDCDC] rounded-[12px] text-start animate-pulse">
      {/* Skeleton for product name */}
      <div className="flex flex-row justify-between text-start">
        <div className="flex-1 sm:mr-4 mr-2">
          <div className="h-6 bg-gray-200 rounded w-[70%] mb-4"></div>
        </div>

        {/* Skeleton for product logo */}
        <div className="w-[40px] h-[40px]">
          <div className="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton for badge (kgCO2e value) */}
      <div className="w-[100px] h-[32px] mt-4 bg-gray-200 rounded"></div>

      {/* Skeleton for certificate number */}
      <div className="w-[60%] h-[18px] mt-4 bg-gray-200 rounded"></div>

      {/* Skeleton for approval and expiration dates */}
      <div className="w-[50%] h-[18px] mt-2 bg-gray-200 rounded"></div>
      <div className="w-[50%] h-[18px] mt-2 bg-gray-200 rounded"></div>
    </div>
  );
}
