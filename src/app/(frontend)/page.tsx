import { CompanyCard } from "@/components/organisms";
import { Button, Card } from "@/components/ui/";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div
        className="relative w-full sm:h-[calc(100vh-51px)] h-[calc(100vh-71px)] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/mock/mock-banner.png')" }}
      >
        <h1 className="text-white text-4xl">Welcome</h1>
      </div>

      <CompanyCard />

      <div className="container mx-auto max-w-screen-xl text-start">
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
      </div>
    </div>
  );
}
