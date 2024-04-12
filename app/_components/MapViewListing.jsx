"use client";

import React, { useEffect, useState } from "react";
import MainListing from "./MainListing";
import Map from "./Map";
import { supabase } from "@/Utils/supabase/client";

function MapViewListing({ type }) {
  const [publishedData, setPublishedData] = useState([]);

  useEffect(() => {
    getPublishedData();
  }, []);

  const getPublishedData = async () => {
    let { data, error } = await supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("active", true)
      .eq("type", type);
    if (data) {
      console.log(data);
      setPublishedData(data);
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <MainListing publishedData={publishedData} />
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
}

export default MapViewListing;
