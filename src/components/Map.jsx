import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import Direction from "./Direction";
import { useRecoilValue } from "recoil";
import { locationState } from "@/state/atoms";

const libraries = ["places"];

export default function Map(props) {

  const { latitude, longitude, onDurationChange } = props;
  const origin = useRecoilValue(locationState);

  //目的地を取得する
  const destination = {
    lat: latitude,
    lng: longitude
  };

  //Map表示サイズ
  const containerStyle = {
    width: "100%",
    height: "86vh",
  };

  const zoom = 13;

  const route = { origin: origin, destination: destination };


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
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
        <Direction {...route} onDurationChange={onDurationChange} />
      </GoogleMap>
    </>
  )
}

