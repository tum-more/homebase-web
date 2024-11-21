import { Metadata } from "next";
import { LoadingProvider } from "../../../share/providers/loadingContextProvider";
import CategorizeForm from "./_categorize.form";

export default function CategorizeScreen() {
  return (
    <LoadingProvider>
      <div>
        <h1 className="text-xl sm:text-2xl text-center font-bold">
          Categorize
        </h1>
        <h2 className=" text-center font-bold">Company Categorization Tool</h2>

        <CategorizeForm />
      </div>
    </LoadingProvider>
  );
}

export const metadata: Metadata = {
  title: "Categorize",
};
