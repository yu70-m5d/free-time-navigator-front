import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { locationState, selectedTagsState, spotsState, timeState } from "@/state/atoms";

export default function useFetchSpots() {
  const [loading, setLoading] = useState(true);
  const location = useRecoilValue(locationState);
  const selectedTags = useRecoilValue(selectedTagsState);
  const time = useRecoilValue(timeState);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.lat !== 0 || location.lng !== 0) {
      fetchSpots();
    }
  }, [ location, setSpots, selectedTags, time]);


  return { loading, fetchSpots };
}
