"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultPosition: [number, number] = [51.505, -0.09];

const openMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface MapComponentProps {
  // height?: string;
  zoom?: number;
  center?: [number, number];
  position?: [number, number];
  borderRadius?: string | number;
  scrollWheelZoom?: boolean;
  minZoom?: number;
  maxZoon?: number;
}

const MapComponent = (props: MapComponentProps) => {
  const {
    zoom = 13,
    center,
    borderRadius = "15px",
    scrollWheelZoom = false,
    minZoom,
    maxZoon,
  } = props;

  return (
    <MapContainer
      center={center ?? defaultPosition}
      zoom={zoom}
      minZoom={minZoom ?? 4}
      maxZoom={maxZoon ?? 18}
      zoomControl={false}
      scrollWheelZoom={scrollWheelZoom}
      dragging={true}
      doubleClickZoom={true}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: borderRadius,
      }}
    >
      <TileLayer url={openMapUrl} />
      {[1, 2]?.map((item) => {
        return (
          <>
            <Marker position={center ?? defaultPosition} />
          </>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
