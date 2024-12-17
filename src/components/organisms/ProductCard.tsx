import { Product } from "@/lib/feature/categorize/categorize-data.schema";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { toDateFormat } from "@/share/helper/formatter";

interface Props {
  product?: Product;
  className?: string;
  onPress?: (companyId?: number) => void;
}

export function ProductCard(props: Props) {
  const { product, className, onPress } = props;

  const imageLoader = (src: string) => {
    return src;
  };

  const handleOnPress = () => {
    if (onPress) {
      onPress(product?.companyId ?? undefined);
    }
  };

  return (
    <button onClick={handleOnPress}>
      <div
        className={`${className} px-6 py-8 border shadow-drop-shadow-base border-[#DCDCDC] rounded-[12px] text-start`}
      >
        <div className="flex flex-row justify-between text-start">
          <div className="flex-1 sm:mr-4 mr-2">
            <h2 className="text-heading-7-semi-bold !normal-case line-clamp-2">
              {product?.productServiceName}
            </h2>
          </div>
          <div className="w-[40px] h-[40px]">
            <Image
              loader={() =>
                imageLoader(
                  "https://thaicarbonlabel.tgo.or.th/admin/uploadfiles/approval/XL/ea468712d5.jpg"
                )
              }
              src={`https://thaicarbonlabel.tgo.or.th/admin/uploadfiles/approval/XL/ea468712d5.jpg`}
              alt={`product-${product?.productServiceName}`}
              width={40}
              height={40}
              unoptimized
              className="border rounded-lg !h-[40px] border-[#DCDCDC]"
            />
          </div>
        </div>
        <Badge variant="success" className="my-4">
          <span className="text-body-1 mr-2">{`{7.99}`}</span>kgCO2e
        </Badge>
        <p className="text-body-3">
          Certificate number: <span className="text-gray-tertiary">-</span>
        </p>
        <p className="text-body-3">
          Approval date:{" "}
          <span className="text-gray-tertiary">
            {!!product?.dateOfCertification
              ? toDateFormat(product?.dateOfCertification, "YYYY-MM-DD")
              : "-"}
          </span>
        </p>
        <p className="text-body-3">
          Expiration date:{" "}
          <span className="text-gray-tertiary">
            {!!product?.validity
              ? toDateFormat(product?.validity, "YYYY-MM-DD")
              : "-"}
          </span>
        </p>
      </div>
    </button>
  );
}
