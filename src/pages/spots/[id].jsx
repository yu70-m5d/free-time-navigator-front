import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicCard from "@/components/BasicCard";
import Map from "@/components/Map";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/styles/SpotShow.module.css"
import TimerModal from "@/components/TimerModal";
import { useRecoilState } from "recoil";
import { modalIsOpenState } from "@/state/atoms";
import { useFavorite } from "@/hooks/useFavorite";


export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_SPOTS}`);
    if(!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const spots = await res.json();

    const paths = spots.map((spot) => ({
      params: { id: spot.id.toString() },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({params}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_SPOTS}/${params.id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const spot = await res.json();

    return {
      props: {
        spot,
      },
      revalidate: false,
    };
  } catch (error) {
    console.error(`Error in getStaticProps for spot ID ${params.id}:`, error);
    return {
      props: {},
      revalidate: false,
    };
  }
}

export default function Spot( {spot} ) {

  const { checkFavorites } = useFavorite();
  const spotId = spot?.id;
  const favorite = checkFavorites(spotId);

   // 子コンポーネントから受け取る
  const [duration, setDuration] = useState(null);

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const router = useRouter()
  const { origin } = router.query;

  const parsedOrigin = origin ? JSON.parse(origin) : null;

  if( router.isFallback ) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header origin={origin} />
      <div className={styles.container}>
        <div className={styles.item1}>
          <BasicCard {...spot} duration={duration} favorite={favorite} />
        </div>
      </div>
      <Map {...spot} origin={parsedOrigin} onDurationChange={handleDurationChange} />
      <div className={styles.push}></div>
      <TimerModal />
      <Footer />
    </>
  );
};