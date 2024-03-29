import { useState } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/atoms";

export const useGetLocation = () => {
  const [error, setError] = useState(null);
  const [location, setLocation] = useRecoilState(locationState);


  const getGeolocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      if (newLocation.lat !== location.lat || newLocation.lng !== location.lng) {
        setLocation(newLocation);
      }
    } catch (error) {
      setError(error);
    }
  };

  return { location, error, getGeolocation };
}
