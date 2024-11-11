import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

import AppList from "@/components/appd/app-list";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col bg-zinc-700/90 text-zinc-100">
      <div className="w-full ">
        <div className="w-full h-[50px] py-2 px-4 bg-zinc-900  items-center flex">
          <Link href="/" className="flex-1 py-1 text-lg font-medium">
            <span>App Directory</span>
          </Link>
          <Link href="https://fdc3.finos.org" target="_blank">
            <Button variant="link" className="text-zinc-100 px-1 mr-2">
              Finos <SquareArrowOutUpRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href="https://fdc3.finos.org/docs/app-directory/overview"
            target="_blank"
          >
            <Button variant="link" className="text-zinc-100 px-1 mr-2">
              Docs <SquareArrowOutUpRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="secondary" size="sm">
            Add your app
          </Button>
        </div>
        <div className="w-full h-[150px] bg-zinc-900/75 flex justify-center items-center">
          <h1 className="text-2xl font-bold ">FDC3 App Directory</h1>
        </div>
      </div>
      <div className="w-full flex-1 flex min-h-0">
        <div className="w-[300px]">filters menu</div>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="w-full h-[100px] p-4">
            <div className="w-full h-full border-2 border-zinc-200">
              <div></div>
            </div>
          </div>
          <AppList />
        </div>
      </div>
    </div>
  );
}
