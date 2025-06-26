"use client";

import { useCallback, useEffect, useState } from "react";
import ThaiAddressData from "../../public/json/thai_address.json";
import { isEmpty, isNil } from "lodash";

const useThaiAddress = () => {
  const [provinces, setProvinces] = useState<string[]>([]);

  useEffect(() => {
    const provinces = ThaiAddressData?.reduce(function (acc: any, item: any) {
      if (!acc.includes(item?.province)) acc.push(item?.province);

      return acc;
    }, []);

    setProvinces(provinces);
  }, []);

  return { provinces };
};

export default useThaiAddress;
