"use client";

import React, { useEffect, useState } from "react";
import MainListing from "./MainListing";
import Map from "./Map";
import { supabase } from "@/Utils/supabase/client";

function MapViewListing({ type }) {
  const [publishedData, setPublishedData] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchAddress, setSearchAddress] = useState();
  const [filterOptions, setFilterOptions] = useState({
    bath: 0,
    bed: 0,
    parking: 0,
    homeType: "",
  });

  console.log(filterOptions);

  // filtering method 1 => component did update
  /*
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

      if (filterOptions.homeType) {
        querySearch = querySearch.eq("propertyType", filterOptions.homeType);
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

  */

  useEffect(() => {
    getPublishedData();
  }, []);

  const getPublishedData = async () => {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("active", true)
      .order("created_at", { ascending: false });
    if (data) {
      console.log(data);
      setPublishedData(data);
      setIsLoading(false);
    } else if (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // filtering method 2 => merging filter and search
  const searchHandler = async () => {
    setIsLoading(true);
    let querySearch = supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", filterOptions.bed)
      .gte("bathroom", filterOptions.bath)
      .gte("parking", filterOptions.parking)
      .like("address", searchAddress)
      .order("created_at", { ascending: false });

    if (filterOptions.homeType) {
      querySearch = querySearch.eq("propertyType", filterOptions.homeType);
    }
    let { data, error } = await querySearch;
    if (data) {
      console.log(data);
      setPublishedData(data);
      setIsLoading(false);
    } else if (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <MainListing
          publishedData={publishedData}
          searchHandler={searchHandler}
          setSearchAddress={setSearchAddress}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isLoading={isLoading}
          setCoordinates={setCoordinates}
        />
      </div>
      <div className="fixed right-5 h-full md:w-[400px] lg:w-[480px] xl:w-[680px]">
        <Map coordinates={coordinates} publishedData={publishedData} />
      </div>
    </div>
  );
}

export default MapViewListing;
