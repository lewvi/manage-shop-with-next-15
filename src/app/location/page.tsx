"use client";

import CardShopList from "@/components/Location/CardShopList";
import React, { useMemo, useState } from "react";
import MOCK_SHOP_LIST from "../../mock/shop-list.json";
import MapItem from "@/components/Common/Map/MapItem";
import CustomCard from "@/components/Common/Card/CustomCard";
import { getStatusColor } from "@/utils/getStatusColor";

const Page = () => {
  const [shopData, setShopData] = useState<IShopLocationData>();

  const shopList = useMemo(() => {
    return MOCK_SHOP_LIST?.result;
  }, []);

  const markerList = useMemo(() => {
    return shopList?.map((item) => {
      const status = item?.status === true ? "active" : "inactive";
      return {
        name: item?.shop_name || "N/A",
        latitude: item?.latitude,
        longitude: item?.longitude,
        color: "#292929",
        signal: getStatusColor(status),
      };
    });
  }, [shopList]);

  const onSelectShopCard = (val: IShopLocationData) => {
    setShopData(val);
  };

  return (
    <CustomCard isShadow={false} styles={{ body: { padding: 12 } }}>
      <div className="relative overflow-hidden rounded-lg h-[calc(100vh-130px)]">
        <MapItem.Provider>
          <MapItem markerList={markerList} zoom={10} />
          <CardShopList
            data={shopList}
            shopData={shopData}
            onSelectShopCard={onSelectShopCard}
          />
        </MapItem.Provider>
      </div>
    </CustomCard>
  );
};

export default Page;
