import React from "react";

function LoadingAds() {
  return (
    <div>
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
    </div>
  );
}

export default LoadingAds;
