import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/atoms";

export default function useGetLocation() {
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

      setLocation(newLocation);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  return { location, error, getGeolocation };
}
