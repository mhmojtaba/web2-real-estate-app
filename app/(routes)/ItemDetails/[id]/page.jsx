"use client";
import Details from "@/app/_components/Details";
import ImageCarousel from "@/app/_components/ImageCarousel";
import { supabase } from "@/Utils/supabase/client";
import { Bath, BedSingle, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ItemDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState();
  const { id } = useParams();
  console.log(item);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("id", id)
      .eq("active", true);

    if (data) {
      console.log(data);
      setItem(data);
      setIsLoading(false);
      console.log(data);
    } else if (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mx-4 my-1">
      {item?.length > 0 &&
        item.map((item, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg  py-2 max-w-4xl w-full"
          >
            <ImageCarousel images={item?.imageUrlListing} />

            <Details item={item} />
          </div>
        ))}
      {isLoading && <Loading />}
    </div>
  );
}

export default ItemDetail;

function Loading() {
  return (
    <>
      <div className="mt-1 w-full max-w-3xl h-[400px] flex flex-col gap-2 m-4 shadow-md animate-pulse rounded-lg">
        <div className="w-full h-[300px] bg-gray-200 mb-5 animate-pulse rounded-lg"></div>
        <div className="w-full h-[100px] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </>
  );
}
