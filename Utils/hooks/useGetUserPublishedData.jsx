import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useUser } from "@clerk/nextjs";

function useGetUserPublishedData(user) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAds, setUserAds] = useState([]);

  useEffect(() => {
    user && getUserPublishedData();
  }, [user]);

  console.log(user);

  const getUserPublishedData = async () => {
    setIsLoading(true);

    let { data, error } = await supabase
      .from("List")
      .select("* , imageUrlListing (id , list_id , url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .order("created_at", { ascending: false });

    if (data) {
      console.log(data);
      setUserAds(data);
      setIsLoading(false);
    } else if (error) {
      console.log(error);
      setError(error?.message);
      setIsLoading(false);
    }
  };

  return { userAds, isLoading, error };
}
export default useGetUserPublishedData;
