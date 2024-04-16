import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function AgentDetail({ item }) {
  console.log(item);
  return (
    <div className="px-5 mt-2 flex flex-col sm:flex-row items-center justify-between ">
      <div className="flex items-center gap-6">
        <Image
          src={item?.profileImage}
          alt="profile"
          width={100}
          height={100}
          className="p-2 rounded-full border-2"
        />
        <div>
          <h2>{item?.name}</h2>
          <h2>{item?.createdBy}</h2>
        </div>
      </div>
      <div className="mt-5 w-full sm:w-fit">
        <a href={`mailto:${item?.createdBy}`}>
          <Button className="w-full px-6">Contact</Button>
        </a>
      </div>
    </div>
  );
}

export default AgentDetail;
