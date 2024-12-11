"use client";

import { useEffect, useState } from "react";
import { useLoading } from "../../../share/providers/loadingContextProvider";
import { addBCorpRawData, deleteAllBCorpRawData, fetchBCorpRawData } from "@/lib/feature/b-corp/b-corp-raw-data.action";

export default function TGOForm() {
  const { loading, setLoading, setError } = useLoading();
  const [totalItems, setTotalItems] = useState<number>(0);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const releaseWakeLock = async () => {
      if (wakeLock) {
        await wakeLock.release();
        setWakeLock(null);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      releaseWakeLock();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [wakeLock]);

  const fetchAndSaveData = async (
    page: number = 1,
    totalSaved: number = 0
  ): Promise<number> => {
    const response = await fetchBCorpRawData(page);
    
    if (response.length === 0) {
      return totalSaved;
    }

    const updatedResults = response;

    while (updatedResults.length > 0) {
      const itemsToSave = updatedResults.slice(0, 100);
      await addBCorpRawData(itemsToSave);
      totalSaved += itemsToSave.length;
      updatedResults.splice(0, 100);
    }

    return fetchAndSaveData(page + 1, totalSaved);
  };

  const handleOnPress = async () => {
    setLoading(true);
    setError(null);
    setTotalItems(0);

    try {
      const newWakeLock = await navigator.wakeLock.request("screen");
      setWakeLock(newWakeLock);

      await deleteAllBCorpRawData();
      const total = await fetchAndSaveData();
      setTotalItems(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleOnPress}
        disabled={loading}
        className={`bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-500 hover:text-white-500"
        }`}
      >
        {loading ? "Loading..." : "Get Data"}
      </button>
      {loading && (
        <div className="mt-4 space-y-2 flex flex-col items-center">
          {/* Spinner */}
          <div role="status" className="mt-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div>
            Your data is currently being processed. Please do not close this
            browser until it's complete.
          </div>
        </div>
      )}

      {totalItems > 0 && (
        <div>
          <h2 className="mt-4 text-center text-lg font-bold">
            Total Items: {totalItems}
          </h2>
        </div>
      )}
    </div>
  );
}
