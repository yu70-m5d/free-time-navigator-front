import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { leadSpotsState, locationState, selectedTagsState, spotsState, timeState } from "@/state/atoms";

export default function useFetchSpots() {
  const [loading, setLoading] = useState(true);
  const [leadLoading, setLeadLoading] = useState(true);
  const location = useRecoilValue(locationState);
  const selectedTags = useRecoilValue(selectedTagsState);
  const time = useRecoilValue(timeState);
  const setSpots = useSetRecoilState(spotsState);
  // const setLeadSpots = useSetRecoilState(leadSpotsState);
  const [leadSpots, setLeadSpots] = useRecoilState(leadSpotsState);


  const fetchSpots = async () => {
    try {
      const params = { tags: selectedTags, time: time, lat: location.lat, lng: location.lng}
      const getSpotsUrl = `${process.env.NEXT_PUBLIC_FTN_API_SPOTS}`;
      const response = await axios.get(getSpotsUrl, {
        params: params
      });

      setSpots(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("データが取得できませんでした:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadSpots = async () => {
    try {
      const params = { tags: selectedTags, time: time, lat: location.lat, lng: location.lng};
      const url = `${process.env.NEXT_PUBLIC_FTN_API_LEAD_SPOTS}`;
      const response = await axios.get(url, {
        params: params
      });
      setLeadSpots(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("データが取得できませんでした:", error);
    } finally {
      setLeadLoading(false);
    }
  };

  useEffect(() => {
    if (location.lat !== 0 || location.lng !== 0) {
      fetchLeadSpots();
    }
  }, [ location, setLeadSpots, selectedTags, time]);

  useEffect(() => {
    if (!leadLoading && leadSpots.length > 0) {
      fetchSpots();
    }

  }, [location, leadSpots, selectedTags, time]);


  return { loading, leadLoading, fetchSpots, fetchLeadSpots };
}
