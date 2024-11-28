"use client";

import React from "react";
import { useLoading } from "@/share/providers/loadingContextProvider";
import { processTgoToProduct } from "@/lib/feature/categorize/categorize-data.action";

export default function ProcessDataForm() {
  const { loading, setLoading, setError } = useLoading();

  const handleOnPress = async () => {
    try {
      setLoading(true);
      await processTgoToProduct();
    } catch (error: any) {
      setError("Error processing data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div className="flex flex-col items-center">
        <button
          onClick={handleOnPress}
          disabled={loading}
          className={`bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-500 hover:text-white"
          }`}
        >
          {loading ? "Processing..." : "Process Data"}
        </button>
      </div>
    </div>
  );
}
