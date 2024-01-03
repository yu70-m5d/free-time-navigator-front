import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { locationState, spotsState } from "@/state/atoms";

export default function useFetchSpots() {
  // const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useRecoilValue(locationState);
  const setSpots = useSetRecoilState(spotsState);

  const fetchSpots = async () => {
    try {
      const getSpotsUrl = `${process.env.NEXT_PUBLIC_FTN_API_SPOTS}`;
      const response = await axios.get(getSpotsUrl, {
        params: location,
      });
      setSpots(response.data);
    } catch (error) {
      console.error("データが取得できませんでした:", error);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, [location, setSpots]);

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  return { loading, fetchSpots };
}
