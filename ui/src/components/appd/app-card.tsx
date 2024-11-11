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
    <div className="border-slate-900 w-[95%] mx-auto flex flex-col border-2 py-[10px] px-[20px] rounded-lg transition transform hover:scale-105 hover:shadow-lg hover:opacity-90 duration-200 shadow-md">
      <div className="flex flex-row">
        <div>
          <Image
            src={iconUrl ? iconUrl : placeholder}
            alt="logo"
            width="100"
            height="100"
            className="rounded-full object-contain"
          />
        </div>
        <div className="pl-[15px] flex-1">
          <div className="text-xl font-bold text-zinc-700">{data.title}</div>
          <div className="text-md text-zinc-950">{data.description}</div>
        </div>
        <div className="flex flex-row">
          <Link
            href={"http://localhost:3001/api/appd/v2/apps/" + data.appId}
            target="_blank"
          >
            <Code2 className="w-4 h-4 mx-2 text-zinc-800" />
          </Link>
          {data.moreInfo && (
            <Link href={data.moreInfo} target="_blank">
              <SquareArrowOutUpRight className="w-4 h-4 mx-2 text-zinc-800" />
            </Link>
          )}
          {data.contactEmail && (
            <Link href={"mailto:" + data.contactEmail}>
              <MailIcon className="w-4 h-4 mx-2 text-zinc-800" />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-row my-3 space-x-1">
        {data.categories?.map((c: string, i: number) => (
          <Badge key={i}>{c}</Badge>
        ))}
      </div>
    </div>
  );
}
