"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position: [number, number] = [51.505, -0.09];

const openMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface MapComponentProps {
  height?: string;
  zoom?: number;
  position?: [number, number];
}

const MapComponent = (props: MapComponentProps) => {
  const { height, zoom } = props;
  return (
    <MapContainer
      center={position}
      zoom={zoom ?? 13}
      style={{ height: height || "100%", width: "100%" }}
    >
      <TileLayer url={openMapUrl} />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
