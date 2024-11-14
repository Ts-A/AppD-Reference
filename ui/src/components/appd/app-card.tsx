import { Code2, SquareArrowOutUpRight, MailIcon } from "lucide-react";
import Image from "next/image";
import placeholder from "../../app/image-1.png";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AppCard({ data }: { data: any }) {
  let iconUrl = null;

  if (data.icons && data.icons[0]["src"])
    iconUrl = data.icons[0]["src"].trimStart().trimEnd();

  return (
    <div className="border-slate-900 w-[95%] mx-auto flex flex-col border-2  rounded-lg transition transform hover:scale-105 hover:shadow-lg hover:opacity-90 duration-200 shadow-md">
      <div className="flex flex-row ">
        <div className="py-[10px] px-[20px]">
          <Image
            src={iconUrl ? iconUrl : placeholder}
            alt="logo"
            width="100"
            height="100"
            className="object-contain"
          />
        </div>
        <div className="pl-[15px] flex-1 py-[10px] px-[20px]">
          <div className="text-xl font-bold text-zinc-700">{data.title}</div>
          <div className="text-md text-zinc-950">{data.description}</div>
        </div>
        <div className="flex flex-row border-slate-500 border-2 rounded-sm border-t-0 border-r-0 self-start">
          <span className="self-start p-1 hover:bg-slate-900 hover:text-slate-50 text-slate-900 ">
            <Link
              href={"http://localhost:3001/api/appd/v2/apps/" + data.appId}
              target="_blank"
            >
              <Code2 className="w-4 h-4" />
            </Link>
          </span>
          {data.moreInfo && (
            <span className="self-start p-1 hover:bg-slate-900 hover:text-slate-50 text-slate-900 ">
              <Link href={data.moreInfo} target="_blank">
                <SquareArrowOutUpRight className="w-4 h-4 " />
              </Link>
            </span>
          )}
          {data.contactEmail && (
            <span className="self-start p-1 hover:bg-slate-900 hover:text-slate-50 text-slate-900 ">
              <Link href={"mailto:" + data.contactEmail}>
                <MailIcon className="w-4 h-4" />
              </Link>
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row my-3 space-x-1 px-[20px]">
        {data.categories?.map((c: string, i: number) => (
          <Badge key={i}>{c}</Badge>
        ))}
      </div>
    </div>
  );
}
