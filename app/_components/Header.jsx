"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useEffect } from "react";

function Header() {
  const path = usePathname();

  const { isSignedIn, user } = useUser();

  useEffect(() => {
    console.log(user);
    console.log(isSignedIn);
    console.log(path);
  }, []);

  return (
    <div className="flex gap-2 items-center justify-between p-3 px-10 shadow-md bg-white z-20 top-0 left-0 right-0 fixed w-full">
      <div className="flex items-center gap-x-10">
        <Link href={"/"}>
          <Image
            src={"/realestate logo.jpg"}
            width={160}
            height={160}
            alt={"logo"}
          />
        </Link>
        <ul className="hidden md:flex gap-x-10">
          <Link href={"/sell"}>
            <li
              className={`"font-medium text-sm hover:text-primary cursor-pointer" ${
                path === "/sell" && "text-primary"
              }`}
            >
              for Sell
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
        <Link href={"/new-ad"}>
          <Button className="flex gap-2">
            <Plus className="w-5 h-5" /> Post Your own
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">SignIn</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
