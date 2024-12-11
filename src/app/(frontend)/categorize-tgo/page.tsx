"use client";

import { useState } from "react";
import { LoadingProvider } from "../../../share/providers/loadingContextProvider";
import CategorizeForm from "./_categorize.form";
import ProcessDataForm from "./_process_data.form";

export default function CategorizeScreen() {
  const [exactMatchCount, setExactMatchCount] = useState(0);
  const [nonExactMatchCount, setNonExactMatchCount] = useState(0);
  const [noneChecking, setNoneChecking] = useState(true);

  return (
    <LoadingProvider>
      <div className="min-h-screen">
        <h1 className="text-xl sm:text-2xl text-center font-bold">
          Categorize
        </h1>
        <h2 className="text-center font-bold">Company Categorization Tool</h2>
        <div className="mt-4 text-center">
          <h2>จำนวนกลุ่มที่เหมือนกัน 100%: {exactMatchCount} กลุ่ม</h2>
          <h2>จำนวนกลุ่มที่ใกล้เคียงกัน 80%: {nonExactMatchCount} กลุ่ม</h2>
        </div>
        <CategorizeForm
          onChecking={(noneChecking: boolean) => {
            setNoneChecking(noneChecking);
          }}
          onCountsChange={(exactCount, nonExactCount) => {
            setExactMatchCount(exactCount);
            setNonExactMatchCount(nonExactCount);
          }}
        />
        {!noneChecking && exactMatchCount == 0 && nonExactMatchCount == 0 && (
          <ProcessDataForm />
        )}
      </div>
    </LoadingProvider>
  );
}
