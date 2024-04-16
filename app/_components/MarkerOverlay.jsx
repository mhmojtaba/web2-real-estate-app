import { Bath, BedSingle, MapPin, Pointer, Ruler, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MarkerOverlay({ selectedItem, setSelectedItem }) {
  const path = usePathname();
  console.log(path);
  console.log(selectedItem);
  return (
    <div>
      <div className="shadow-lg rounded-lg px-5 py-3  bg-white bg-opacity-80 min-w-fit ">
        <X
          className="float-right w-4 h-4 mb-1 text-black"
          cursor={"Pointer"}
          onClick={() => setSelectedItem()}
        />
        <Link
          href={
            path !== `/ItemDetails/${selectedItem?.id}`
              ? `/ItemDetails/${selectedItem?.id}`
              : null
          }
        >
          <div>
            <Image
              alt={selectedItem?.imageUrlListing[0].url}
              src={selectedItem?.imageUrlListing[0].url}
              width={100}
              height={100}
              className="rounded-lg object-cover w-full h-[200px]"
            />
            <div className="flex flex-col mt-2 gap-3">
              <h2 className="font-bold text-xl text-black">
                <span className="text-rose-500 mr-2">$</span>
                {selectedItem?.sellingPrice}
              </h2>
              <h3 className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {selectedItem?.address}
              </h3>
              <div className="flex gap-3 justify-between mt-3">
                <h2 className="bg-gray-300 text-sm hover:border hover:border-primary w-full text-gray-500 rounded-md flex selectedItems-center justify-between px-4 md:px-1 lg:px-4 py-2">
                  <BedSingle className="w-4 h-4" />
                  {selectedItem?.bedroom}
                </h2>
                <h2 className="bg-gray-300 text-sm hover:border hover:border-primary w-full text-gray-500 rounded-md flex selectedItems-center justify-between px-4 md:px-1 lg:px-4 py-2">
                  <Bath className="w-4 h-4" />
                  {selectedItem?.bathroom}
                </h2>
                <h2 className="bg-gray-300 text-xs hover:border hover:border-primary w-full text-gray-500 rounded-md flex selectedItems-center justify-between px-4 md:px-1 lg:px-4 py-2">
                  <Ruler className="w-4 h-4" />
                  {selectedItem?.area}
                </h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MarkerOverlay;
