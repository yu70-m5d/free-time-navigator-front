import { GoogleMap, MarkerF, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import Direction from "./Direction";
import { useRecoilValue } from "recoil";
import { locationState } from "@/state/atoms";
import { useCallback, useEffect, useState } from "react";
import { useGetLocation } from "@/hooks/useGetLocation";
import styles from "@/styles/Map.module.css";


export default function Map(props) {

  const { latitude, longitude, onDurationChange } = props;
  const origin = useRecoilValue(locationState);

  const { getGeolocation } = useGetLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrigin = async() => {
      setLoading(true);
      try {
        await getGeolocation();
      } catch (error) {
        console.error("Error getting geolocation:", error);
      } finally {
        setLoading(false);
      }
    }

    if (origin.lat === 0 || origin.lng === 0) {
      getOrigin();
    }
  }, [origin]);


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

  const zoom = 100;

  const route = { origin: origin, destination: destination };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    language: 'ja'
  });

  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(origin);
    map.fitBounds(bounds);

    setMap(map)
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  if(loading) {
    return (
      <div className={styles.loadingAnimation}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={origin}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <Direction {...route} onDurationChange={onDurationChange} />
      </>
    </GoogleMap>
    ) : <></>
}

