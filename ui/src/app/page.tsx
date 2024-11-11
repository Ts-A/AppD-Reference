"use client";

import AppList from "@/components/appd/app-list";
import AppdHeader from "@/components/appd/appd-header";

export default function Home() {
  return (
    <div className="w-full max-w-[1200px] mx-auto h-full flex flex-col bg-zinc-200 text-zinc-100">
      <AppdHeader />
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
