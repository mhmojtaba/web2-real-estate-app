import { Bath, BedSingle, MapPin, Ruler, RulerIcon } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";

function MainListing({ publishedData }) {
  console.log(publishedData);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {publishedData?.length > 0 ? (
          publishedData.map((item, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg px-5 py-3 max-w-md cursor-pointer
             hover:border-2 hover:border-primary"
            >
              <Image
                src={item?.imageUrlListing[0].url}
                width={400}
                height={300}
                className="rounded-lg object-cover w-[400px] h-[300px]"
              />
              <div className="flex flex-col mt-2 gap-3">
                <h2 className="font-bold text-xl">
                  <span className="text-rose-500 mr-2">$</span>
                  {item?.sellingPrice}
                </h2>
                <h3 className="flex gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {JSON.parse(item?.address).label}
                </h3>
                <div className="flex gap-3 justify-between mt-3">
                  <h2 className="bg-gray-300 text-sm w-full text-gray-500 rounded-md flex items-center justify-between px-4 md:px-1 lg:px-4 py-2">
                    <BedSingle className="w-4 h-4" />
                    {item?.bedroom}
                  </h2>
                  <h2 className="bg-gray-300 text-sm w-full text-gray-500 rounded-md flex items-center justify-between px-4 md:px-1 lg:px-4 py-2">
                    <Bath className="w-4 h-4" />
                    {item?.bathroom}
                  </h2>
                  <h2 className="bg-gray-300 text-xs w-full text-gray-500 rounded-md flex items-center justify-between px-4 md:px-1 lg:px-4 py-2">
                    <RulerIcon className="w-4 h-4" />
                    {item?.area}
                  </h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default MainListing;
function Loading() {
  return (
    <>
      {[1, 2, 3, 4].map((item, index) => (
        <div
          key={index}
          className="w-full h-[400px] flex flex-col gap-2 m-4 shadow-md animate-pulse rounded-lg"
        >
          <div className="w-full h-[300px] bg-gray-200 mb-5 animate-pulse rounded-lg"></div>
          <div className="w-full h-[100px] bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      ))}
    </>
  );
}
