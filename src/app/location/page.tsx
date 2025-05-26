"use client";

import CustomCard from "@/components/Common/Card/CustomCard";
import MapView from "@/components/Common/Map/MapView";
import CardShopList from "@/components/Location/CardShopList";
import { Card } from "antd";
import React from "react";

const mockData = [
  {
    shop_id: "",
    shop_name: "",
    status: true,
    location: [0, 0],
  },
];

const Page = () => {
  return (
    <div className="relative rounded-md h-[calc(100vh-130px)] bg-white">
      <>
        <MapView />
      </>
      <div className="absolute top-5 left-5 right-5 z-[5000] flex flex-col gap-y-2 h-fit">
        {/* <Card className="w-[400px] h-[calc(100vh-200px)]"></Card> */}
        <CardShopList />
      </div>
    </div>
  );
};

export default Page;
