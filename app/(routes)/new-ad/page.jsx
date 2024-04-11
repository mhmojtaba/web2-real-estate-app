"use client";

import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/Utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function NewAd() {
  const [selectedAddress, setSelectedAddress] = useState({ label: "isf" });
  const [coordinates, setCoordinates] = useState({ lat: 31, long: 52 });
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const sendAddressHandler = async () => {
    setLoader(true);
    const { data, error } = await supabase
      .from("List")
      .insert([
        {
          address: selectedAddress,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();
    if (data) {
      setLoader(false);
      console.log(data);
      toast.success("address added successfully");
      router.push(`complete-ad/${data[0].id}`);
    } else if (error) {
      setLoader(false);
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="mt-10 md:mx-52 lg:mx-72">
      <div className="p-12 flex flex-col gap-6 items-center justify-center">
        <h2 className="font-bold text-3xl">add new advertisement</h2>
        <div className=" rounded-lg border shadow-md p-6 flex flex-col gap-5">
          <h3>Enter your address</h3>
          <div>
            <GoogleAddressSearch
              setSelectedAddress={setSelectedAddress}
              setCoordinates={setCoordinates}
            />
          </div>
          <Button
            onClick={sendAddressHandler}
            // disabled={!selectedAddress || !coordinates}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewAd;
