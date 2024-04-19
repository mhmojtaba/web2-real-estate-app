import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

function useGetPublishedData(type) {
  const [publishedData, setPublishedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchAddress, setSearchAddress] = useState();
  const [filterOptions, setFilterOptions] = useState({
    bath: 0,
    bed: 0,
    parking: 0,
    homeType: "",
  });

  useEffect(() => {
    getPublishedData();
  }, []);

  const getPublishedData = async () => {
    setIsLoading(true);

    let querySearch = supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (type) {
      querySearch = querySearch.eq("type", type);
    }

    let { data, error } = await querySearch;
    if (data) {
      console.log(data);
      setPublishedData(data);
      setIsLoading(false);
    } else if (error) {
      console.log(error);
      setErrorMessage(error?.message);
      setIsLoading(false);
    }
  };

  // search handler

  const searchHandler = async () => {
    try {
      setIsLoading(true);
      let querySearch = supabase
        .from("List")
        .select("* , imageUrlListing (id , list_id , url)")
        .eq("active", true)
        .gte("bedroom", filterOptions?.bed)
        .gte("bathroom", filterOptions?.bath)
        .gte("parking", filterOptions?.parking)
        .order("created_at", { ascending: false });

      // if (searchAddress) {
      //   querySearch = querySearch.ilike("address", searchAddress);
      // }

      if (searchAddress) {
        querySearch = querySearch.ilike("address", searchAddress);
      }

      if (type) {
        querySearch = querySearch.eq("type", type);
      }

      if (filterOptions.homeType) {
        querySearch = querySearch.eq("propertyType", filterOptions?.homeType);
      }

      let { data, error } = await querySearch;
      console.log(filterOptions);
      console.log(searchAddress);

      if (data) {
        console.log(data);
        setPublishedData(data);
        setIsLoading(false);
      } else if (error) {
        console.log(error?.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function setAddressSearch(i) {
    setSearchAddress(i);
  }

  function setFilterOption(i) {
    setFilterOptions(i);
  }

  return {
    publishedData,
    isLoading,
    errorMessage,
    setAddressSearch,
    searchHandler,
    setFilterOption,
    searchAddress,
    filterOptions,
  };
}

export default useGetPublishedData;
