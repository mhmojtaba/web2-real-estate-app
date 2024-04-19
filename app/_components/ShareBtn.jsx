import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";

function ShareBtn({ pageTitle }) {
  const path = usePathname();
  const shareUrl = process.env.NEXT_PUBLIC_DOMAIN_URL + path;
  const title = { pageTitle };
  console.log(pageTitle);

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-3" asChild>
          <Button className="flex gap-3">
            <Share /> Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-center flex">
          <DropdownMenuItem>
            <FacebookShareButton url={shareUrl} className="">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TwitterShareButton url={shareUrl} title={title} className="">
              <XIcon size={32} round />
            </TwitterShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TelegramShareButton url={shareUrl} title={title} className="">
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className=""
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkedinShareButton url={shareUrl} className="">
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EmailShareButton
              url={shareUrl}
              subject={title}
              body="body"
              className=""
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ShareBtn;
