import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";


const Map = () => {
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const containerStyle = {
    width: "100%",
    height: "86vh",
  };
  const zoom = 13;


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // setLatitude(position.coords.latitude)
      // setLongitude(position.coords.longitude)
      setPosition({...position, lat: position.coords.latitude, lng: position.coords.longitude})
      console.log(position.coords)
    },
    (err) => {
      console.log(err);
    })

  }, [])

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={zoom}
        >
          <MarkerF position={position} label={"現在地"} />
        </GoogleMap>
      </LoadScript>
    </>
  )
}


export default function Home() {
  return (
    <>
      <div>
        <Map />
      </div>
    </>
  )
}
