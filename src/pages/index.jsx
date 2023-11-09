import React from "react";
import Map from "../components/Map";
import BasicCard from "../components/BasicCard";


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
  return (
    <>
      <div>
        <Map />
      </div>
      <div>
        {spots.map((spot) => (
          <BasicCard key={spot.id} spot={spot} />
        ))}
      </div>
    </>
  )
}
