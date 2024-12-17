"use client";
import Image from "next/image";
import { Button } from "../ui";
import { useRouter } from "next/navigation";

export function NotFoundView() {
  const router = useRouter();

  const handleToHome = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-1 flex-col items-center justify-center container mx-auto max-w-screen-xl px-4">
      <h1 className="font-heading text-[88px] font-black">404</h1>
      <h2 className="font-body text-2xl mb-6">Whoops.. Page not found</h2>
      <Button
        onClick={handleToHome}
        variant="text"
        iconLeft={
          <Image
            src={"/images/icons/Chevron-brand-left@3X.png"}
            alt="Chevron-brand-left"
            width={16}
            height={16}
          />
        }
      >
        <span className="text-xs">Back to homepage</span>
      </Button>
    </div>
  );
}
