import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { locationState, selectedTagsState, spotsState } from "@/state/atoms";

export default function useFetchSpots() {
  // const [spots, setSpots] = useState([]);
  // const tags = [];
  // const [time]
  const [loading, setLoading] = useState(true);
  const location = useRecoilValue(locationState);
  const selectedTags = useRecoilValue(selectedTagsState);
  const time = [];
  const setSpots = useSetRecoilState(spotsState);

  const fetchSpots = async () => {
    try {
      const params = { tags: selectedTags, time: time, lat: location.lat, lng: location.lng}
      const getSpotsUrl = `${process.env.NEXT_PUBLIC_FTN_API_SPOTS}`;
      const response = await axios.get(getSpotsUrl, {
        params: params
      });
      setSpots(response.data);
    } catch (error) {
      console.error("データが取得できませんでした:", error);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, [location, setSpots, selectedTags]);

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  return { loading, fetchSpots };
}
