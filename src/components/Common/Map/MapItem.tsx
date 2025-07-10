"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { useMapContext, MapProvider } from "@/provider/MapContext";

interface IMaps {
  markerList?: any[];
  [key: string]: any;
}

export default function MapItem(props: IMaps) {
  const context = useMapContext();

  const Map = useMemo(
    () =>
      dynamic(() => import("./MapComponent"), {
        ssr: false,
      }),
    []
  );

  return (
    <Map
      center={context.center}
      zoom={context.zoom}
      markerList={props?.markerList}
      viewMap={context.viewMap}
      {...props}
    />
  );
}

MapItem.Provider = MapProvider;
