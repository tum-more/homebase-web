import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <h2 className={"text-orange-500"}>hhhhhhhh;;;;;</h2>
      <p>This is a paragraph with the Inter font.</p>
      <p className="text-body1SemiBold font-body font-semibold text-red-500">
        This is body1 with semi-bold style.
      </p>
      <Card className="shadow-drop-shadow-sm m-10">
        <p className="text-body1SemiBold font-body font-semibold text-red-500 px-16">
          This is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.CardsddddThis is body1 with semi-bold style.Cardsdddd
        </p>
      </Card>
    </div>
  );
}
