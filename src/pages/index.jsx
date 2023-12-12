import React, { useEffect, useState } from "react";
import BasicCard from "../components/BasicCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Home() {
  // 状態管理
  //// 現在地
  const [origin, setOrigin] = useState({
    lat: 0,
    lng: 0,
  });

  //// 取得したspots
  const [fetchedSpots, setFetchedSpots] = useState([]);

  //// useEffect完了の状態を管理
  const [isEffectComplete, setIsEffectComplete] = useState(false);

  // 検索時sFetchedSpots更新
  const handleSpotsDataChange = (newSpotsData) => {
    setFetchedSpots(newSpotsData)
  };

  // 初回マウント時に実行
  useEffect(() => {
    // Railsからspot情報を持ってくる
    const sendOriginToRails = async (origin) => {
      try {
        const queryParams = new URLSearchParams({ lat: origin.lat, lng: origin.lng });
        const url = `${process.env.NEXT_PUBLIC_FTN_API_INDEX}?${queryParams}`;
        const res = await fetch(url);
        const spots = await res.json();

        return spots

      } catch (error) {
        console.log("error", error);
      }
    };

    // スポット情報を取得する
    const getSpots = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // 現在地を更新
        setOrigin({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })

        // 現在地をRailsAPIに渡し、spotsを受け取る
        const fetchedSpots = await sendOriginToRails({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        // spots状態を更新
        setFetchedSpots(fetchedSpots);

        // useEffect状態を更新
        setIsEffectComplete(true);
      } catch (error) {
        console.error("error", error);
        setIsEffectComplete(true);
      }
    };

    getSpots();
  }, []);


  if (!isEffectComplete) {
    return (
      <>
        <Header onSpotsData={handleSpotsDataChange} origin={origin} />
        <div>現在地を取得しています。</div>
      </>
    );
  }

  return (
    <>
      <Header onSpotsData={handleSpotsDataChange} origin={origin} />
      <div className="container">
        {fetchedSpots.length ? fetchedSpots.map((spot) => (
          <BasicCard key={spot.id} {...spot} origin={origin} />
        )) : <div>データが見つかりませんでした。</div> }
      </div>
      <Footer />
    </>
  )
}
