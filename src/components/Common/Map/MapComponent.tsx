"use client";

import React, { useEffect, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import { DollarCircleFilled, ShopOutlined } from "@ant-design/icons";
import { isNil } from "lodash";
import styled from "styled-components";
import { useMapContext } from "@/provider/MapContext";

interface IMarkerIcon {
  name: string;
  position: [number, number];
  color?: string;
  signal?: string;
}

interface IMarkerList {
  name: string;
  latitude: number;
  longitude: number;
  color?: string;
  signal?: string;
}

interface IMaps {
  center?: [number, number];
  viewMap?: [number, number];
  markerList?: IMarkerList[];
  zoomControl?: boolean;
  scrollWheelZoom?: boolean;
  zoom?: number;
  minZoom?: number;
  maxZoon?: number;
  height?: string | number;
  onViewChange?: (e: any) => void;
}

const openMapsURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const SignalContainer = styled.div<{ $color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 42px;
  z-index: -1;

  > .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    background-color: ${({ $color }) => $color};
    border-radius: 100%;
    opacity: 0.2;
  }

  > .circle-fill {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 15px);
    height: calc(100% + 15px);
    background: transparent;
    border: ${({ $color }) => `2px solid ${$color}`};
    border-radius: 100%;
  }
`;

// prevent unnecessary re-renders
// eslint-disable-next-line react/display-name
const MarkerIcon = React.memo(
  ({ name, position, color, signal }: IMarkerIcon) => {
    const mapContext = useMapContext();

    const onViewMap = (latitude: number, logtitude: number) => {
      mapContext.setMap({
        viewMap: [latitude ?? 13.7442, logtitude ?? 100.4608],
        zoom: 16,
        center: [latitude ?? 13.7442, logtitude ?? 100.4608],
      });
    };
    return (
      <Marker
        position={position}
        icon={MarkerStatus(color, signal)}
        eventHandlers={{
          click: () => onViewMap(position[0], position[1]),
        }}
      >
        <Tooltip direction="top">{name || "N/A"}</Tooltip>
      </Marker>
    );
  }
);

const SetMapView = ({ center, zoom, viewMap, onViewChange }: IMaps) => {
  const map = useMap();
  const currentCenter = useRef<any>(center);
  const currentZoom = useRef<any>(zoom);

  useMapEvent("zoomend", () => {
    const zoom = map?.getZoom();
    if (zoom === currentZoom.current) return;

    if (typeof onViewChange !== "function") return;
    currentZoom.current = zoom;
    onViewChange({ zoom });
  });

  useMapEvent("moveend", () => {
    const { lat: nLat, lng: nLng } = map?.getCenter();
    const [oLat, oLng] = currentCenter.current;
    if (oLat === nLat && oLng === nLng) return;

    if (typeof onViewChange !== "function") return;
    const center = [nLat, nLng];
    currentCenter.current = center;
    onViewChange({ center });
  });

  useEffect(() => {
    const changeValue = { zoom: false, center: false };
    if (currentZoom.current !== zoom) {
      currentZoom.current = zoom;
      changeValue.zoom = true;
    }
    if (
      !Array.isArray(currentCenter.current) ||
      !Array.isArray(center) ||
      currentCenter.current[0] !== center[0] ||
      currentCenter.current[1] !== center[1]
    ) {
      currentCenter.current = center;
      changeValue.center = true;
    }

    if (changeValue.center && changeValue.zoom) {
      map?.setView(currentCenter.current, currentZoom.current);
    } else if (changeValue.center) {
      map?.panTo(currentCenter.current);
    } else if (changeValue.zoom) {
      map?.setZoom(currentZoom.current);
    }
  }, [center, zoom, map]);

  useEffect(() => {
    map?.setMaxBounds([
      [-90, -180],
      [90, 180],
    ]);
  }, [map]);

  useEffect(() => {
    if (viewMap) map.setView(viewMap, 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMap]);

  return null;
};

const MarkerStatus = (color?: string, signal?: string) => {
  const html = useMemo(() => {
    return `<div class="relative w-fit">

      ${renderToString(
        <div className="relative" style={{ width: "100%" }}>
          <svg
            width={42}
            height={42}
            viewBox="0 0 46 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 22.533C0.00281474 16.5553 2.42738 10.8235 6.74051 6.5979C11.0536 2.37235 16.9022 -0.000920153 23 2.67624e-07C35.6995 2.67624e-07 46 10.0906 46 22.533C46 31.8084 41.2655 39.1587 36.1914 44.1259C33.9483 46.3343 31.4345 48.2615 28.7075 49.8633C27.5682 50.5223 26.5031 51.0426 25.576 51.3964C24.702 51.7364 23.7855 52 23 52C22.2145 52 21.298 51.7364 20.424 51.3964C19.3417 50.9647 18.2948 50.4521 17.2925 49.8633C14.5655 48.2614 12.0517 46.3343 9.80862 44.1259C4.73446 39.1587 0 31.8084 0 22.533Z"
              fill={color ?? "#292929"}
            />
          </svg>
          <div
            className="absolute left-[50%] top-1"
            style={{ transform: "translateX(-50%)" }}
          >
            <div
              className="relative bg-white w-[28px] h-[28px]"
              style={{ borderRadius: "50%" }}
            >
              <div className="absolute" style={{ top: "5px", left: "5px" }}>
                <ShopOutlined
                  style={{ fontSize: "18px", color: color ?? "#292929" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      ${
        isNil(signal) === false
          ? renderToString(
              <SignalContainer $color={signal}>
                <div className="circle"></div>
                <div className="circle-fill"></div>
              </SignalContainer>
            )
          : ""
      }
    </div>`;
  }, [color, signal]);

  return L.divIcon({
    className: "custom-icon",
    html: html,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const MapComponent = (props: IMaps) => {
  const {
    center,
    markerList,
    zoom,
    zoomControl,
    scrollWheelZoom,
    minZoom,
    maxZoon,
    onViewChange,
    viewMap,
    height,
  } = props;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={minZoom ?? 4}
      maxZoom={maxZoon ?? 18}
      zoomControl={zoomControl ?? false}
      scrollWheelZoom={scrollWheelZoom ?? true}
      style={{ height: height || "100vh", width: "100%" }}
      dragging={true}
      doubleClickZoom={true}
    >
      <TileLayer url={openMapsURL} />
      <SetMapView
        center={center}
        zoom={zoom}
        onViewChange={onViewChange}
        viewMap={viewMap}
      />
      {markerList?.map((item, i) => (
        <MarkerIcon
          key={i + 1}
          name={item?.name}
          position={[item?.latitude, item?.longitude]}
          color={item?.color}
          signal={item?.signal}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
