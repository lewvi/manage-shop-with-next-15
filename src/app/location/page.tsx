"use client";

import MapView from "@/components/Common/Map/MapView";
import CardShopList from "@/components/Location/CardShopList";
import React, { useMemo, useState } from "react";
import MOCK_SHOP_LIST from "../../mock/shop-list.json";

const Page = () => {
  const [shopData, setShopData] = useState<IShopLocationData>();

  const shopList = useMemo(() => {
    return MOCK_SHOP_LIST?.result;
  }, []);

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
