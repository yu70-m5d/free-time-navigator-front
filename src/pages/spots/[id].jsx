import { useRouter } from "next/router";
import React, { useState } from "react";
import BasicCard from "../../components/BasicCard";
import Map from "../../components/Map";


export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}`)
  const spots = await res.json();

  const paths = spots.map((spot, index) => ({
    params: { id: spot.id.toString()}
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}`+`/${params.id}`)
  const spot = await res.json();

  return {
    props: {
      spot,
    },
    revalidate: 60,
  };
}

export default function Spot( {spot} ) {

   // 子コンポーネントから受け取る
  const [duration, setDuration] = useState(null);
  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const router = useRouter()
  const { origin } = router.query;

  const parsedOrigin = origin ? JSON.parse(origin) : null;
  console.log(parsedOrigin);

  if( router.isFallback ) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <BasicCard {...spot} duration={duration} />
        <Map {...spot} origin={parsedOrigin} onDurationChange={handleDurationChange} />
      </div>
    </>
  );
};