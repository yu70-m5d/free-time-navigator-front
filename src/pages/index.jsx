import React, { useEffect, useState } from "react";
import BasicCard from "../components/BasicCard";

// RailsAPIとの通信
export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}`);
  const spots = await res.json();

  return {
    props: {
      spots,
    },
    revalidate: 60 * 60 * 24,
  };
}


export default function Home( {spots} ) {

    // 現在地を取得する
    const [origin, setOrigin] = useState({
      lat: 0,
      lng: 0,
    });

    // useEffect完了の状態を管理
    const [isEffectComplete, setIsEffectComplete] = useState(false);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setOrigin({
          ...origin,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsEffectComplete(true);
      },
      (err) => {
        console.log(err);
        setIsEffectComplete(true);
      })
    }, []);

    if (!isEffectComplete) return <div>現在地を取得しています。</div>;

  return (
    <>
      <div>
        {spots.map((spot) => (
          <BasicCard key={spot.id} {...spot} origin={origin} />
        ))}
      </div>
    </>
  )
}
