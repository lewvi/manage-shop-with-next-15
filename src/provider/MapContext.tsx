"use client";

import { isEmpty, isNil } from "lodash";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IMapProvider {
  viewMap?: number[];
  center?: number[];
  zoom?: number;
  children: React.ReactNode;
}

interface IInitialMap {
  center?: number[];
  viewMap?: number[];
  zoom?: number;
}

const initialMap = {
  center: [13.7, 100.4],
  zoom: 6,
};

const MapContext = createContext<any>({});

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};

export const MapProvider = ({ center, zoom, children }: IMapProvider) => {
  const [currentMap, setCurrentMap] = useState<IInitialMap>(initialMap);

  const handleSetMap = (val: IInitialMap) => {
    setCurrentMap((prev) => ({ ...prev, ...val }));
  };

  const contextValue = useMemo(
    () => ({
      current: { ...currentMap },
      viewMap: currentMap?.viewMap,
      center: currentMap?.center,
      zoom: currentMap?.zoom,
      setMap: handleSetMap,
    }),
    [currentMap]
  );

  useEffect(() => {
    const params: IInitialMap = {};

    if (isEmpty(center) === false) {
      params.center = [
        Number(center?.[0]) || Number(currentMap?.center?.[0]) || 0,
        Number(center?.[1]) || Number(currentMap?.center?.[1]) || 0,
      ];
    }

    if (isNil(zoom) === false) {
      params.zoom = Number(zoom);
    } else {
      params.zoom = Number(initialMap?.zoom);
    }

    if (isEmpty(params) === false) {
      setCurrentMap((prev) => ({ ...prev, ...params }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, zoom]);

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
