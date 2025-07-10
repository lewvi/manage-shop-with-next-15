"use client";

import CardShopList from "@/components/Location/CardShopList";
import React, { useEffect, useMemo, useState } from "react";
import MOCK_SHOP_LIST from "../../mock/shop-list.json";
import MapItem from "@/components/Common/Map/MapItem";
import CustomCard from "@/components/Common/Card/CustomCard";
import { getStatusColor } from "@/utils/getStatusColor";
import ModalShopInformation from "@/components/Location/ModalShopInformation";

const Page = () => {
  const [shopData, setShopData] = useState<IShopLocationData | undefined>();
  const [open, setOpen] = useState(false);

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

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const onSelectShopCard = (val: IShopLocationData) => {
    setShopData(val);
    handleToggleModal();
  };

  useEffect(() => {
    if (open === false) {
      setShopData(undefined);
    }
  }, [open]);

  return (
    <React.Fragment>
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
      <ModalShopInformation
        data={shopData}
        open={open}
        onClose={handleToggleModal}
      />
    </React.Fragment>
  );
};

export default Page;
