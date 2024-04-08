"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useEffect } from "react";

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="flex gap-2 items-center justify-between p-3 px-10 shadow-md z-20 fixed w-full">
      <div className="flex items-center gap-x-10">
        <Image src={"/logo.svg"} width={130} height={130} alt={"logo"} />
        <ul className="hidden md:flex gap-x-10">
          <Link href={"/sale"}>
            <li
              className={`"font-medium text-sm hover:text-primary cursor-pointer" ${
                path === "/sale" && "text-primary"
              }`}
            >
              for Sale
            </li>
          </Link>
          <Link href={"/rent"}>
            <li
              className={`"font-medium text-sm hover:text-primary cursor-pointer" ${
                path === "/rent" && "text-primary"
              }`}
            >
              for Rent
            </li>
          </Link>
          <Link href={"/agents"}>
            <li
              className={`"font-medium text-sm hover:text-primary cursor-pointer" ${
                path === "/agents" && "text-primary"
              }`}
            >
              Agent Finder
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Button className="flex gap-2">
          <Plus className="w-5 h-5" /> Post Your own
        </Button>
        <Button variant="outline">SignIn</Button>
      </div>
    </div>
  );
}

export default Header;
