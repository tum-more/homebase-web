import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-heading-7-semi-bold">Hello</h1>
      <h2 className={"text-orange-500"}>hhhhhhhh;;;;;</h2>
      <p>This is a paragraph with the Inter font.</p>
      <p className="font-body text-red-500 text-body-3-semi-bold">
        This is body1 with semi-bold style.
      </p>
      <Card className="shadow-inner m-10">
        <p className="text-red-500 px-16 text-body-5">
          This is body1 with semi-bold style.CardsddddThis is body1 with
          semi-bold style.CardsddddThis is body1 with semi-bold
          style.CardsddddThis is body1 with semi-bold style.CardsddddThis is
          body1 with semi-bold style.CardsddddThis is body1 with semi-bold
          style.CardsddddThis is body1 with semi-bold style.CardsddddThis is
          body1 with semi-bold style.CardsddddThis is body1 with semi-bold
          style.CardsddddThis is body1 with semi-bold style.Cardsdddd
        </p>
      </Card>
      {/* <Button disabled={true} variant={'filled'} loading={false} iconLeft={<Image src={""} alt="button" />}>
        ADD
      </Button> */}
      <Button disabled={true} variant={"filled"} loading={false}>
        ADD
      </Button>
      <Button variant={"outline"} loading={false}>
        ADD
      </Button>
      <Button disabled={true} variant={"brand"} loading={false}>
        ADD
      </Button>
      <Button variant={"text"} loading={false}>
        ADD
      </Button>
    </div>
  );
}
