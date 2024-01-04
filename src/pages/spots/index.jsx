import React, { useEffect, useState } from "react";
import BasicCard from "@/components/BasicCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import axios from "axios";
import useGetLocation from "@/hooks/useGetLocation";
import { useRecoilValue } from "recoil";
import { locationState, spotsState } from "@/state/atoms";
import useFetchSpots from "@/hooks/useFetchSpots";


export default function Home() {
  // 状態管理
  //// 現在地
  const { location } = useGetLocation();
  const { loading } = useFetchSpots();
  const origin = useRecoilValue(locationState);
  const spots = useRecoilValue(spotsState);

  //// 取得したspots
  const [time, setTime] = useState("");
  const [tags, setTags] = useState([]);


  const handleTimeChange = (newTime) => {
    setTime(newTime);
    console.log(newTime);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
    console.log(newTags);
  };

  console.log(origin);
  console.log(spots);
  console.log(loading);


  if (!loading) {
    return (
      <>
        {/* <Header onSpotsData={handleSpotsDataChange} origin={origin} /> */}
        <Header />
        <div>現在地を取得しています。</div>
      </>
    );
  };

  return (
    <>
      {/* <Header onSpotsData={handleSpotsDataChange} onTimeChange={handleTimeChange} origin={origin} tags={tags} /> */}
      <MultiSelectDropdown />
      <div className="container">
        {spots.length ? spots.map((spot) => (
          <BasicCard key={spot.id} {...spot} />
        )) : <div>データが見つかりませんでした。</div> }
      </div>
      <Footer />
    </>
  )
}