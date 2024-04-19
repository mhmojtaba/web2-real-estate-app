"use client";

import React, { useState } from "react";
import MainListing from "./MainListing";
import Map from "./Map";
// import { supabase } from "@/Utils/supabase/client";
import useGetPublishedData from "@/Utils/hooks/useGetPublishedData";

function MapViewListing({ type }) {
  // const [publishedData, setPublishedData] = useState([]);
  const [coordinates, setCoordinates] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // const [searchAddress, setSearchAddress] = useState();
  // const [filterOptions, setFilterOptions] = useState({
  //   bath: 0,
  //   bed: 0,
  //   parking: 0,
  //   homeType: "",
  // });

  const {
    publishedData,
    isLoading,
    errorMessage,
    searchAddress,
    searchHandler,
    setAddressSearch,
    setFilterOption,
    filterOptions,
  } = useGetPublishedData(type);

  console.log(type);
  console.log(filterOptions);

  // filtering method 1 => component did update
  /* /*
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

  // */

  console.log(coordinates);
  console.log(searchAddress);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <MainListing
          publishedData={publishedData}
          searchHandler={searchHandler}
          setSearchAddress={setAddressSearch}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOption}
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
