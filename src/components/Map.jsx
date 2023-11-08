import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";


export default function Map() {

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

