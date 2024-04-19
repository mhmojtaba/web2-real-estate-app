"use client";

import { UserButton, UserProfile, useUser } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import React from "react";
import MyAds from "./my-ads";

function page() {
  return (
    <div>
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Ads"
          url="/my-ads"
          labelIcon={<Building2 className="w-4 h-4" />}
        >
          <MyAds />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
}

export default page;
