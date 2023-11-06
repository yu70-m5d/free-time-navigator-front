import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";


// マップ
const containerStyle = {
  width: "100%",
  height: "86vh",
};

const center = {
  lat: 35.55138821256619,
  lng: 139.44547619305862,
};

const zoom = 13;

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      ></GoogleMap>
    </LoadScript>
  );
};


export default function Home() {
  console.log("test")
  return (
    <>
      <Map />
    </>
  )
}
