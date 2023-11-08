import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import Link from "next/link";
import Map from "../components/Map";
import BasicCard from "../components/BasicCard";


export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/spots");
  const spots = await res.json();

  console.log(spots);

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
        {/* <Map /> */}
      </div>
      <div>
        {spots.map((spot) => (
          <BasicCard spot={spot} />
        ))}
      </div>
    </>
  )
}
