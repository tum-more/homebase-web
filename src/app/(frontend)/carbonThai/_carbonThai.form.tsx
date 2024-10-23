"use client";

import { addCarbonThaiData, fetchThaiCarbon } from "@/lib/feature/carbonThai/carbonThai.action";
import { useState } from "react";
import { useLoading } from "./loadingContext";

export default function CarbonThaiForm() {
  const { loading, setLoading, progress, setProgress, setError } = useLoading();
  const [data, setData] = useState<any[]>([]);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setData([]);
    setProgress(0);
  
    try {
      const results: any[] = [];
      const totalPages = 10;
  
      for (let page = 1; page <= totalPages; page++) {
        const response = await fetchThaiCarbon(page);
        results.push(...response);
        setProgress(Math.round((page / totalPages) * 100));
      }
  
      setData(results);
      console.log({ results });
  
      // Save the results to the database
      await addCarbonThaiData(results);
  
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };
  

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {loading ? "Loading..." : "Get Data"}
      </button>

      <div className="mt-4 text-center w-200">
        <div className="h-2 bg-gray-300">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{progress}%</p>
      </div>

      {data.length > 0 && (
        <div>
          <h2 className="mt-4 text-lg font-bold">Results: {data.length}</h2>
        </div>
      )}
    </div>
  );
}
