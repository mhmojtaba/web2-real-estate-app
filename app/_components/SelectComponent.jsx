import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectComponent({
  defaultOpen,
  name,
  onValueChange,
  placeholder,
  selectItems = [],
  className,
  children,
}) {
  return (
    <div>
      <Select
        defaultOpen={defaultOpen}
        name={name}
        onValueChange={onValueChange}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-10">
          {selectItems.map((item, index) => (
            <SelectItem key={index} value={item.value} className="z-10">
              <h2 className="flex items-center gap-3 z-10">
                {children} {item.label}
              </h2>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectComponent;

{
  /* <Select
  defaultOpen={listedData?.propertyType}
  name="propertyType"
  onValueChange={(e) => (values.propertyType = e)}
>
  <SelectTrigger className="w-[180px]">
    <SelectValue
      placeholder={
        listedData?.propertyType ? listedData?.propertyType : "Property type"
      }
    />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="House">House</SelectItem>
    <SelectItem value="apartment">apartment</SelectItem>
    <SelectItem value="room">room</SelectItem>
  </SelectContent>
</Select>; */
}
