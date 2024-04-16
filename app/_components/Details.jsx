import {
  Bath,
  BedDoubleIcon,
  CarFrontIcon,
  ConstructionIcon,
  Home,
  LandPlot,
  MapPin,
} from "lucide-react";
import React from "react";
import Map from "./Map";
import AgentDetail from "./AgentDetail";
import ShareBtn from "./ShareBtn";

function Details({ item }) {
  // console.log(item.coordinates);
  return (
    item && (
      <div className="my-6 flex flex-col gap-3 ">
        <div className="flex items-center justify-between px-5">
          <div className="">
            <h2 className="font-extrabold text-4xl mb-3">
              <span className=" mr-2 font-semibold text-3xl">$</span>
              {item?.sellingPrice}
            </h2>
            <h3
              className="flex items-center gap-2 text-sm text-gray-500"
              // onClick={() => setCoordinates(item?.coordinates)}
            >
              <MapPin className="w-4 h-4" />
              {/* address must be fixed */}
              {item?.address}
            </h3>
          </div>
          <ShareBtn
            pageTitle={`a/an ${item?.propertyType} in ${item?.address}`}
          />
        </div>
        <hr></hr>

        <div className="flex flex-col gap-3 mt-5 px-5">
          <h2 className="text-2xl font-bold ">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <h2
              className="flex gap-4 items-center bg-purple-100 text-sm md:text-lg
             rounded-lg p-3 text-primary justify-center hover:border-2 hover:border-primary"
            >
              <Home />
              {item?.propertyType}
            </h2>

            <h2
              className="flex gap-4 items-center bg-purple-100 text-sm md:text-lg
             rounded-lg p-3 text-primary justify-center hover:border-2 hover:border-primary"
            >
              <ConstructionIcon />
              BuiltIn {item?.builtIn}
            </h2>
            <h2
              className="flex gap-4 items-center bg-purple-100 text-sm md:text-lg
             rounded-lg p-3 text-primary justify-center hover:border-2 hover:border-primary"
            >
              <LandPlot />
              {item?.area}
            </h2>
            <h2
              className="flex gap-4 items-center bg-purple-100 text-sm md:text-lg
             rounded-lg p-3 text-primary justify-center hover:border-2 hover:border-primary"
            >
              <BedDoubleIcon />
              {item?.bedroom} {item?.bedroom > 1 ? "Beds" : "Bed"}
            </h2>
            <h2
              className="flex gap-4 items-center bg-purple-100 text-sm md:text-lg
             rounded-lg p-3 text-primary justify-center hover:border-2 hover:border-primary"
            >
              <Bath />
              {item?.bathroom} {item?.bathroom > 1 ? "Bathrooms" : "Bathroom"}
            </h2>
            <h2
              className="flex gap-4 items-center bg-purple-100 text-sm md:text-lg
             rounded-lg p-3 text-primary justify-center hover:border-2 hover:border-primary"
            >
              <CarFrontIcon />
              {item?.parking} {item?.parking > 1 ? "parkings" : "parking"}
            </h2>
          </div>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
            <div className="rounded-lg shadow-lg flex flex-col gap-5 p-3">
              <h2 className="text-2xl font-bold ">Description</h2>
              <h2>{item?.description}</h2>
            </div>
            <div className="rounded-lg shadow-lg flex flex-col gap-5 p-3">
              <h2 className="text-2xl font-bold "> extra features</h2>
              <h2>{item?.extra}</h2>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3">
          <h2 className="px-4 py-2 text-2xl font-bold text-gray-500">Map</h2>
          <Map coordinates={item?.coordinates} publishedData={[item]} />
        </div>
        <div>
          <AgentDetail item={item} />
        </div>
      </div>
    )
  );
}

export default Details;
