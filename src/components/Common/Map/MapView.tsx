import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../Map/MapComponent"), {
  ssr: false,
});

export default MapView;
