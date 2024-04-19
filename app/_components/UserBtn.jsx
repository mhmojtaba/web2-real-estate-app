import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function UserBtn({ user }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="" asChild>
          <Image
            src={user?.imageUrl}
            alt="profile image"
            width={35}
            height={35}
            className="rounded-full cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/userProfile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/userProfile#/my-ads"}>My Ads</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton>LogOut</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserBtn;
