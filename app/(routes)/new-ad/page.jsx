"use client";

import MapIconGoogle from "@/app/_components/MapIconGoogle";
// import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/Utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SearchBox, { components } from "tomtom-react-searchbox";

function NewAd() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  // console.log(selectedAddress, coordinates);

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
          <div className="flex items-center gap-2">
            <MapIconGoogle />
            <SearchBox
              components={{ Result: CustomResult }}
              autofocus={false}
              className="outline-none p-3"
              wrapperClassName="w-full outline-none p-3 flex-1"
              placeholder="search the property address"
              onResultChoose={(result) => {
                setCoordinates(result.position);
                setSelectedAddress(result.address.localName);
                console.log(result.address.localName);
              }}
              searchOptions={{
                key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
                language: "en-Gb",
                limit: 5,
                typeahead: true,
              }}
            />
            {/* <GoogleAddressSearch
              setSelectedAddress={setSelectedAddress}
              setCoordinates={setCoordinates}
            /> */}
          </div>
          <Button
            onClick={sendAddressHandler}
            disabled={!selectedAddress || !coordinates}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );

  // result
  function CustomResult(props) {
    return (
      <div className={`my-result ${props.isSelected ? "-selected" : ""}`}>
        <div className="icon">❤</div>
        <components.Result {...props} />
      </div>
    );
  }
}

export default NewAd;
