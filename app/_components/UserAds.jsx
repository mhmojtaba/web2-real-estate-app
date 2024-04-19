"use client";
import React, { useEffect, useState } from "react";
import LoadingAds from "./LoadingAds";
import { supabase } from "@/Utils/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { Bath, BedSingle, MapPin, Ruler, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ALertModal from "./ALertModal";
import toast from "react-hot-toast";
import useGetUserPublishedData from "@/Utils/hooks/useGetUserPublishedData";
import { useUser } from "@clerk/nextjs";

function UserAds() {
  const { user } = useUser();
  const { error, isLoading, userAds } = useGetUserPublishedData(user);
  // const [isLoading, setIsLoading] = useState(false);
  // const [userAds, setUserAds] = useState([]);

  // useEffect(() => {
  //   user && getPublishedData();
  // }, [user]);

  // console.log(user);
  console.log(userAds);

  const deleteHandler = async (id) => {
    console.log(id);

    const { error: error2 } = await supabase
      .from("imageUrlListing")
      .delete()
      .eq("list_id", id);

    if (error2) {
      console.log(error2?.message);
    } else {
      const { error: error1 } = await supabase
        .from("List")
        .delete()
        .eq("id", id);
      if (error1) {
        console.log(error1?.message);
      }
      toast.success("data deleted successfully");
    }
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  return (
    <div>
      <h2 className="text-gray-400 font-bold p-3">Listing ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {userAds &&
          userAds.map((item, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg px-5 py-3 max-w-md cursor-pointer
             hover:border-2 hover:border-primary "
            >
              <Link href={`/ItemDetails/${item?.id}`} className="">
                <span className="absolute z-10 m-1">
                  {item?.active === true ? (
                    <Badge className="py-1 px-3 bg-green-600">Published</Badge>
                  ) : (
                    <Badge variant="destructive" className="py-1 px-3">
                      Draft
                    </Badge>
                  )}
                </span>
                <Image
                  alt={item?.imageUrlListing[0]?.url}
                  src={
                    item?.imageUrlListing[0]
                      ? item?.imageUrlListing[0]?.url
                      : "/landscape-placeholder.svg"
                  }
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px]"
                />

                <div className="flex flex-col mt-2 gap-3">
                  <h2 className="font-bold text-xl">
                    <span className="text-rose-500 mr-2">$</span>
                    {item?.sellingPrice}
                  </h2>
                  <h2 className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {/* address must be fixed */}
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {item?.address}
                    </span>
                  </h2>
                  <div className="flex gap-3 justify-between mt-3">
                    <h2 className="bg-gray-300 text-sm hover:border hover:border-primary w-full text-gray-500 rounded-md flex items-center justify-between px-4 md:px-1 lg:px-4 py-2">
                      <BedSingle className="w-4 h-4" />
                      {item?.bedroom}
                    </h2>
                    <h2 className="bg-gray-300 text-sm hover:border hover:border-primary w-full text-gray-500 rounded-md flex items-center justify-between px-4 md:px-1 lg:px-4 py-2">
                      <Bath className="w-4 h-4" />
                      {item?.bathroom}
                    </h2>
                    <h2 className="bg-gray-300 text-xs hover:border hover:border-primary w-full text-gray-500 rounded-md flex items-center justify-between px-4 md:px-1 lg:px-4 py-2">
                      <Ruler className="w-4 h-4" />
                      {item?.area}
                    </h2>
                  </div>
                </div>
              </Link>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Button size="sm" className="w-full">
                  <Link href={`/complete-ad/${item?.id}`}>Edit</Link>
                </Button>

                <ALertModal
                  child={
                    <Button size="sm" variant="destructive" className="w-full">
                      <Trash className="w-auto h-5 mr-2" />
                      Delete
                    </Button>
                  }
                  label={"Do you Want to Delete the ad?"}
                  onClick={() => deleteHandler(item?.id)}
                  actionLabel={"Continue"}
                />
              </div>
            </div>
          ))}
      </div>
      {isLoading && <LoadingAds />}
    </div>
  );
}

export default UserAds;
