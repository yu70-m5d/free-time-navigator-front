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

  return (
    <>
      <div>
        {spots.map((spot) => (
          <BasicCard key={spot.id} {...spot} />
        ))}
      </div>
    </>
  )
}
