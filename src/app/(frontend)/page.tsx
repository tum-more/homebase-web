import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative w-full sm:h-[calc(100vh-71px)] bg-cover bg-center flex items-center justify-between">
        <div className="container mx-auto max-w-screen-xl text-start flex sm:flex-row flex-col items-center">
          <div>
            <p
              className="sm:text-heading-2 text-heading-4-bold bold"
              style={{
                paddingBottom: "var(--spacing-2)",
              }}
            >
              Get to know
              your customers
              with forms worth
              filling out
            </p>
            <p
              className="text-body-3"
              style={{
                color: "var(--colors-gray-700)",
                paddingBottom: "var(--spacing-8)",
              }}
            >
              Collect all the data you need to understand customers with forms
              designed to be refreshingly different
            </p>
            <Button
              disabled={false}
              variant={"brand"}
              style={{
                height: "48px",
              }}
              iconLeft={
                <Image
                  src={"/images/icons/Chevron-right.png"}
                  alt=""
                  width={24}
                  height={24}
                />
              }
            >
              Get Started
            </Button>
          </div>
          <img
            src="/images/mock/Fixed-aspect-ratio-spacer.png"
            alt=""
            style={{ width: "588px" }}
          />
        </div>
      </div>

      {/* <div className="container mx-auto max-w-screen-xl" style={{ paddingBottom: "48px" }}>
        <div
          className="bg-cover bg-center flex items-center justify-center text-center"
          style={{
            backgroundImage: "url('/images/back-ground-search.png')",
            width: "1296px",
            height: "452px",
          }}
        >
          <div
            style={{
              width: "778px",
              height: "210px",
            }}
          >
            <p
              className="text-heading-7-semi-bold"
              style={{
                fontSize: "var(--font-size-5xl)",
                lineHeight: "120%",
                letterSpacing: "-1.44px",
                fontWeight: "900",
                paddingBottom: "var(--spacing-4)",
                textShadow: "var(--shadow-drop-shadow-base)",
              }}
            >
              Discover the world-saving <br /> results we've achieved
            </p>
            <p
              style={{
                color: "var(--colors-gray-700)",
                fontFamily: "var(--font-family-body)",
                lineHeight: "150%",
                fontWeight: "400",
                fontStyle: "normal",
                fontSize: "var(--font-size-base)",
                paddingBottom: "var(--spacing-6)",
              }}
            >
              Evaluated company directory.
            </p>
            <div
              className="inline-flex w-full items-center space-x-3"
              style={{
                height: "60px",
              }}
            >
              <Input
                placeholder="Search by company or product"
                style={{
                  flex: "0 0 80%",
                  height: "100%",
                  paddingLeft: "30px",
                }}
              />
              <Button
                style={{
                  flex: "0 0 20%",
                  height: "100%",
                }}
                disabled={false}
                variant={"brand"}
                iconLeft={
                  <Image
                    src={"/images/icons/Search.png"}
                    alt=""
                    width={24}
                    height={24}
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                  />
                }
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="container mx-auto max-w-screen-xl text-start">
        <h1 className="text-heading-7-semi-bold">Hello</h1>
        <h2 className={"text-orange-500"}>hhhhhhhh;;;;;</h2>
        <p>This is a paragraph with the Inter font.</p>
        <p className="font-body text-red-500 text-body-3-semi-bold">
          This is body1 with semi-bold style.
        </p>
        <Card className="shadow-inner m-10">
          <p className="text-red-500 px-16 text-body-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </Card>
        <div className="flex align-center py-20">
          <Button
            disabled
            iconLeft={
              <Image
                src={"/images/icons/Chevron-left.png"}
                alt=""
                width={24}
                height={24}
              />
            }
          >
            ADD
          </Button>
          <Button
            disabled={false}
            iconLeft={
              <Image
                src={"/images/icons/Chevron-left.png"}
                alt=""
                width={24}
                height={24}
              />
            }
          >
            Label
          </Button>
          <Button variant={"outline"} loading={false}>
            Label
          </Button>
          <Button disabled variant={"outline"} loading={false}>
            Label
          </Button>
          <Button variant={"brand"} loading={false}>
            Get started
          </Button>
          <Button disabled={true} variant={"brand"} loading={false}>
            Get started
          </Button>
          <Button variant={"text"} loading={false}>
            Label
          </Button>
          <Button disabled variant={"text"} loading={false}>
            Label
          </Button>
        </div>
      </div> */}
    </div>
  );
}
