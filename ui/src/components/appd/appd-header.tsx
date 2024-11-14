import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function AppdHeader() {
  return (
    <div className="w-full">
      <div className="w-full h-[50px] py-2 px-4 bg-zinc-900  items-center flex">
        <Link href="/" className="flex-1 py-1 text-lg font-medium">
          <span>App Directory</span>
        </Link>
        <Link href="https://fdc3.finos.org" target="_blank">
          <Button variant="link" className="text-zinc-100 px-1 mr-2">
            Finos <SquareArrowOutUpRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="http://localhost:3001/docs" target="_blank">
          <Button variant="link" className="text-zinc-100 px-1 mr-2">
            Docs <SquareArrowOutUpRight className="w-4 h-4" />
          </Button>
        </Link>
        {/* <Button variant="secondary" size="sm">
          Add your app
        </Button> */}
      </div>
      <div className="w-full h-[150px] bg-zinc-900/75 flex justify-center items-center">
        <h1 className="text-2xl font-bold ">FDC3 App Directory</h1>
      </div>
    </div>
  );
}
