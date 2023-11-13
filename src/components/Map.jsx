import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import Direction from "./Direction";


export default function Map(spot) {

  // 現在地を取得する
  const [origin, setOrigin] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setOrigin({...origin, lat: position.coords.latitude, lng: position.coords.longitude})
      // console.log(position.coords)
    },
    (err) => {
      console.log(err);
    })
  }, [])

  //目的地を取得する
  const destination = {
    lat: spot.latitude,
    lng: spot.longitude
  };

  //Map表示サイズ
  const containerStyle = {
    width: "100%",
    height: "86vh",
  };

  const zoom = 13;

  const route = { origin: origin, destination: destination };


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={zoom}
        >
          <MarkerF position={origin} label={"現在地"} />
          <Direction {...route} />
        </GoogleMap>
    </>
  )
}

