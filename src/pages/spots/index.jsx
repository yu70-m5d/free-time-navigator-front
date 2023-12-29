import React, { useEffect, useState } from "react";
import BasicCard from "@/components/BasicCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import axios from "axios";


export default function Spots() {
  // 状態管理
  //// 現在地
  const [origin, setOrigin] = useState({
    lat: 0,
    lng: 0,
  });

  //// 取得したspots
  const [spots, setSpots] = useState([]);
  const [time, setTime] = useState("");
  const [tags, setTags] = useState([]);
  const [useEffectFinished, setUseEffectFinished] = useState(false);

  // 検索時sFetchedSpots更新
  const handleSpotsDataChange = (newSpotsData) => {
    setSpots(newSpotsData);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    console.log(newTime);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
    console.log(newTags);
  };

  // 初回マウント時に実行
  useEffect(() => {

    // RailsAPIに現在地を送信し、スポット情報を取得する
    const getSpots = async (origin) => {
      try {
        const getSpotsUrl = `${process.env.NEXT_PUBLIC_FTN_API_SPOTS}`
        const responseSpotsData = await axios.get(getSpotsUrl, {
          params: origin,
        });
        handleSpotsDataChange(responseSpotsData.data);
      } catch (error) {
        console.error("データが取得できませんでした:", error);
      } finally {
        setUseEffectFinished(true);
      }
    };

    // 現在地を取得後、周辺スポット情報を取得する
    const getOriginFetchData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const originData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setOrigin(originData);
        await getSpots(originData);
      } catch (error) {
        console.error("現在地の取得に失敗:", error);
      }
    };

    getOriginFetchData();

  }, []);


  if (!useEffectFinished) {
    return (
      <>
        <Header onSpotsData={handleSpotsDataChange} origin={origin} />
        <div>現在地を取得しています。</div>
      </>
    );
  }

  return (
    <>
      <Header onSpotsData={handleSpotsDataChange} onTimeChange={handleTimeChange} origin={origin} tags={tags} />
      <MultiSelectDropdown onSpotsData={handleSpotsDataChange} onTagsChange={handleTagsChange} origin={origin} time={time} />
      <div className="container">
        {spots.length ? spots.map((spot) => (
          <BasicCard key={spot.id} {...spot} origin={origin} />
        )) : <div>データが見つかりませんでした。</div> }
      </div>
      <Footer />
    </>
  )
}
