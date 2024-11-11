import { Code2, SquareArrowOutUpRight, MailIcon } from "lucide-react";
import Image from "next/image";
import placeholder from "../../app/image-1.png";
import { Badge } from "@/components/ui/badge";

export default function AppCard() {
  return (
    <div className="w-[95%] mx-auto flex flex-col border-2 py-[10px] px-[20px] rounded-lg transition transform hover:scale-105 hover:shadow-lg hover:opacity-90 duration-200 shadow-md">
      <div className="flex flex-row">
        <div>
          <Image
            src={placeholder}
            alt="logo"
            width="100"
            height="100"
            className="rounded-full "
          />
        </div>
        <div className="pl-[15px] flex-1">
          <div className="text-xl font-bold">Adaptable Demo</div>
          <div className="text-md font-light">A short description about it</div>
        </div>
        <div className="flex flex-row">
          <Code2 className="w-4 h-4 mx-2" />
          <SquareArrowOutUpRight className="w-4 h-4 mx-2" />
          <MailIcon className="w-4 h-4 mx-2" />
        </div>
      </div>
      <div className="flex flex-row my-3 space-x-1">
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
      </div>
    </div>
  );
}
