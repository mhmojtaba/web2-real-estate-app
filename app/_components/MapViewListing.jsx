"use client";

import React, { useEffect, useState } from "react";
import MainListing from "./MainListing";
import Map from "./Map";
import { supabase } from "@/Utils/supabase/client";

function MapViewListing({ type }) {
  const [publishedData, setPublishedData] = useState([]);
  const [searchAddress, setSearchAddress] = useState();
  const [filterOptions, setFilterOptions] = useState({
    bath: null,
    bed: null,
    parking: null,
    homeType: null,
  });

  console.log(filterOptions);

  // filtering method 1 => component did update
  useEffect(() => {
    async function querySearch() {
      supabase
        .from("List")
        .select("* , imageUrlListing (id , list_id , url)")
        .eq("active", true)
        .eq("type", type)
        .eq("bedroom", filterOptions.bed)
        .eq("bathroom", filterOptions.bath)
        .eq("parking", filterOptions.parking)
        .like("address", searchAddress)
        .order("created_at", { ascending: false });

      if (homeType) {
        querySearch = querySearch.eq("homeType", filterOptions.homeType);
      }
      let { data, error } = await querySearch;
      if (data) {
        console.log(data);
        setPublishedData(data);
      } else if (error) {
        console.log(error);
      }
    }
    querySearch();
  }, [filterOptions]);

  useEffect(() => {
    getPublishedData();
  }, []);

  const getPublishedData = async () => {
    let { data, error } = await supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("active", true)
      .eq("type", type)
      .order("created_at", { ascending: false });
    if (data) {
      console.log(data);
      setPublishedData(data);
    } else if (error) {
      console.log(error);
    }
  };

  // filtering method 2 => merging filter and search
  const searchHandler = async () => {
    let querySearch = supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("active", true)
      .eq("type", type)
      .eq("bedroom", filterOptions.bed)
      .eq("bathroom", filterOptions.bath)
      .eq("parking", filterOptions.parking)
      .like("address", searchAddress)
      .order("created_at", { ascending: false });

    if (homeType) {
      querySearch = querySearch.eq("homeType", filterOptions.homeType);
    }
    let { data, error } = await querySearch;
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
        <MainListing
          publishedData={publishedData}
          searchHandler={searchHandler}
          setSearchAddress={setSearchAddress}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
}

export default MapViewListing;
