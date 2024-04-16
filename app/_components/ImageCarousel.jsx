import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function ImageCarousel({ images }) {
  console.log(images);
  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <Image
                src={item?.url}
                width={800}
                height={300}
                alt={item?.url}
                className="rounded-lg object-cover h-[400px] w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
