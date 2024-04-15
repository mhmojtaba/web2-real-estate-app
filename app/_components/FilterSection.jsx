import React from "react";
import SelectComponent from "./SelectComponent";
import { BathIcon, BedDouble, CarFront } from "lucide-react";

function FilterSection({ setFilterOptions }) {
  const bedroomItems = [
    { label: "2+", value: "2" },
    { label: "3+", value: "3" },
    { label: "4+", value: "4" },
  ];
  const BathroomItems = [
    { label: "2+", value: "2" },
    { label: "3+", value: "3" },
    { label: "4+", value: "4" },
  ];
  const ParkingItems = [
    { label: "1+", value: "1" },
    { label: "2+", value: "2" },
    { label: "3+", value: "3" },
  ];
  const propertyTypes = [
    { label: "all", value: null },
    { label: "house", value: "house" },
    { label: "apartment", value: "apartment" },
    { label: "dorm", value: "dorm" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 px-3 py-2 mb-4">
      <SelectComponent
        defaultOpen={""}
        name={"bathroom"}
        onValueChange={(e) =>
          setFilterOptions((prev) => ({ ...prev, bath: e }))
        }
        placeholder={"bathroom"}
        selectItems={BathroomItems}
        className={"w-full"}
      >
        <BathIcon className="text-primary" />
      </SelectComponent>
      <SelectComponent
        defaultOpen={""}
        name={"bedroom"}
        onValueChange={(e) => setFilterOptions((prev) => ({ ...prev, bed: e }))}
        placeholder={"bedroom"}
        selectItems={bedroomItems}
        className={"w-full"}
      >
        <BedDouble className="text-primary" />
      </SelectComponent>
      <SelectComponent
        defaultOpen={""}
        name={"parking"}
        onValueChange={(e) =>
          setFilterOptions((prev) => ({ ...prev, parking: e }))
        }
        placeholder={"parking"}
        selectItems={ParkingItems}
        className={"w-full"}
      >
        <CarFront className="text-primary" />
      </SelectComponent>
      <SelectComponent
        defaultOpen={""}
        name={"propertyType"}
        onValueChange={(e) =>
          setFilterOptions((prev) => ({ ...prev, homeType: e }))
        }
        placeholder={"propertyType"}
        selectItems={propertyTypes}
        className={"w-full"}
      />
    </div>
  );
}

export default FilterSection;
