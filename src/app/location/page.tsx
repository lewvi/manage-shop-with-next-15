"use client";

import MapView from "@/components/Common/Map/MapView";
import CardShopList from "@/components/Location/CardShopList";
import React, { useState } from "react";

const shopList = [
  {
    shop_id: "shop_001",
    shop_name: "Shop Name 001",
    shop_status: true,
  },
  {
    shop_id: "shop_002",
    shop_name: "Shop Name 002",
    shop_status: true,
  },
  {
    shop_id: "shop_003",
    shop_name: "Shop Name 003",
    shop_status: false,
  },
];

const Page = () => {
  const [shopData, setShopData] = useState<IShopLocationData>();

  const onSelectShopCard = (val: IShopLocationData) => {
    setShopData(val);
  };

  return (
    <div className="relative h-[calc(100vh-130px)] bg-white p-3 rounded-2xl shadow-xl">
      <>
        <MapView />
      </>
      <div className="absolute top-5 left-5 right-5 z-[1000] flex flex-col gap-y-2 h-fit">
        <CardShopList
          data={shopList}
          shopData={shopData}
          onSelectShopCard={onSelectShopCard}
        />
      </div>
    </div>
  );
};

export default Page;
