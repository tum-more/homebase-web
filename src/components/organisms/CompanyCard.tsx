import { CompanyWithIndustry } from "@/lib/feature/company/company.schema";

interface Props {
  data: CompanyWithIndustry;
  variant?: "full" | "column";
  className?: string;
  onPress?: (companyId?: number) => void;
}

export function CompanyCard({
  data,
  variant = "column",
  className = "",
  onPress,
}: Props) {
  const handleOnPress = () => {
    if (onPress) {
      onPress(data?.id);
    }
  };

  return (
    <button onClick={handleOnPress} className="w-full">
      <div
        className={`${className} px-6 py-8 border shadow-drop-shadow-base border-[#DCDCDC] rounded-[12px] text-start`}
      >
        <h2
          className={
            variant === "full"
              ? "text-heading-5-bold !normal-case"
              : "text-heading-7-semi-bold !normal-case"
          }
        >
          {data.companyName}
        </h2>
        <div
          className={`flex ${
            variant === "full" ? "flex-col mt-4" : "sm:flex-row flex-col mt-6"
          } justify-between text-start `}
        >
          <div className="flex-1">
            <h3 className="text-heading-8-bold sm:mb-1 !normal-case">
              Industry
            </h3>
            <p
              className={`text-gray-600 ${
                variant === "full" ? "mt-2" : "mt-0"
              }`}
            >
              {!!data.industry && data.industry?.length > 0
                ? data.industry.join(", ")
                : "-"}
            </p>
          </div>
          <div className="flex-1 mt-6 sm:mt-0">
            <h3 className="text-heading-8-bold sm:mb-1 !normal-case">
              Location
            </h3>
            <p className="text-gray-600">{data.location ?? "-"}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
