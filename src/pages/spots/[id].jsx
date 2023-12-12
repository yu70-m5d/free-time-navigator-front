import { useRouter } from "next/router";
import React, { useState } from "react";
import BasicCard from "../../components/BasicCard";
import Map from "../../components/Map";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}`)
//   const spots = await res.json();

//   const paths = spots.map((spot, index) => ({
//     params: { id: spot.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export async function getStaticProps({ params }) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}/${params.id}`)
//   const spot = await res.json();

//   console.log(spot);

//   return {
//     props: {
//       spot,
//     },
//     revalidate: 60,
//   };
// }

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}`);
    if(!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const spots = await res.json();
    console.log(spots);

    const paths = spots.map((spot, index) => ({
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}/${params.id}`);
    // const res = await fetch("http://localhost:3000/spots/1?origin=%7B%22lat%22%3A35.5505823%2C%22lng%22%3A139.4455394%7D");
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    const spot = await res.json();
    console.log(spot);

    return {
      props: {
        spot,
      },
      revalidate: false,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {},
      revalidate: false,
    };
  }
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

  if( router.isFallback ) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header origin={origin} />
      <div>
        <BasicCard {...spot} duration={duration} />
        <Map {...spot} origin={parsedOrigin} onDurationChange={handleDurationChange} />
      </div>
      <Footer />
    </>
  );
};