import { CompanyWithIndustry } from "@/lib/feature/company/company.schema";

interface Props {
  data: CompanyWithIndustry;
  className?: string;
  onPress?: () => void;
}

export function CompanyCard(props: Props) {
  return (
    <div className="px-6 py-8 border border-[#DCDCDC] rounded-[12px] text-start">
      <h2 className="text-heading-7-semi-bold !normal-case">
        {props.data.companyName}
      </h2>
      <div className="flex sm:flex-row flex-col justify-between text-start mt-6">
        <div className="flex-1">
          <h3 className="text-heading-8-semi-bold !normal-case">Industry</h3>
          <p className="text-gray-600">
            {!!props.data.industry && props.data.industry?.length > 0
              ? props.data.industry.join(", ")
              : "-"}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="text-heading-8-semi-bold !normal-case">Location</h3>
          <p className="text-gray-600">{props.data.location ?? "-"}</p>
        </div>
      </div>
    </div>
  );
}
