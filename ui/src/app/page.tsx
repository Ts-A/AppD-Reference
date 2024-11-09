import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

import AppList from "@/components/appd/app-list";

export default function Home() {
  return (
    <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col bg-zinc-700/90 text-zinc-100">
      <div className="w-full ">
        <div className="w-full h-[50px] py-2 px-4 bg-zinc-900  items-center flex">
          <span className="flex-1 py-1 text-lg font-medium">App Directory</span>
          <Button variant="link" className="text-zinc-100 px-1 mr-2">
            Finos <SquareArrowOutUpRight className="w-4 h-4" />
          </Button>
          <Button variant="link" className="text-zinc-100 px-1 mr-2">
            Docs <SquareArrowOutUpRight className="w-4 h-4" />
          </Button>
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
          <div className="w-full h-[100px]">search box</div>
          <AppList />
        </div>
      </div>
    </div>
  );
}
