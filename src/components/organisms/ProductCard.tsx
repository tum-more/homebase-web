import { Product } from "@/lib/feature/categorize/categorize-data.schema";
import Image from "next/image";

interface Props {
  product?: Product;
  className?: string;
  onPress?: () => void;
}

export function ProductCard(props: Props) {
  const { product, className, onPress } = props;

  const myLoader = ({ src }: any) => {
    return "https://thaicarbonlabel.tgo.or.th/admin/uploadfiles/approval/XL/4dde064f84.jpg";
  };

  return (
    <div className="px-6 py-8 border border-[#DCDCDC] rounded-[12px] text-start">
      <div className="flex sm:flex-row flex-col justify-between text-start">
        <div>
          <h2 className="text-heading-7-semi-bold !normal-case">
            {
              "3M 3-in-1 Floor Cleaner Concentrate 24H, 3M Twist Fill™ Dispensing System 3M 3-in-1 Floor Cleaner Concentrate 24H, 3M Twist Fill™ Dispensing System"
            }
          </h2>
        </div>
        <div>
          {/* <Image
            src={'https://thaicarbonlabel.tgo.or.th/admin/uploadfiles/approval/XL/4dde064f84.jpg'}
            alt={`product-${product?.productServiceName}`}
            width={40}
            height={40}
          /> */}

          <Image
            loader={myLoader}
            src={`https://thaicarbonlabel.tgo.or.th/admin/uploadfiles/approval/XL/4dde064f84.jpg`}
            alt={`product-${product?.productServiceName}`}
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}
