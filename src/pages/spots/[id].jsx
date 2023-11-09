import { useRouter } from "next/router";
import React from "react";
import BasicCard from "../../components/BasicCard";


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

  console.log("コンソールログ");
  console.log(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}`+`/${params.id}`);
  console.log(spot);

  return {
    props: {
      spot,
    },
    revalidate: 60,
  };
}

export default function Spot( {spot} ) {
  const router = useRouter()

  if( router.isFallback ) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <BasicCard spot={spot} />
      </div>
    </>
  );
};