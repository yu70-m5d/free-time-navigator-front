import { useRecoilValueLoadable } from "recoil";
import { spotsState } from "@/state/atoms";
import useGetLocation from "@/hooks/useGetLocation";
import useFetchSpots from "@/hooks/useFetchSpots";
import BasicCard from "@/components/BasicCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import styles from "@/styles/SpotsIndex.module.css";


export default function Page() {

  useGetLocation();
  const { loading } = useFetchSpots();
  const spotsLoadable = useRecoilValueLoadable(spotsState);


  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.item1NotFound}>スポットを取得しています。</div>
      </>
    );
  };

  const spots = spotsLoadable.state === 'hasValue' ? spotsLoadable.contents : [];

  return (
    <>
      <Header />
      <MultiSelectDropdown />
      <div className={styles.container} >
        {spots.length ? spots.map((spot) => (
          <div className={styles.item1} key={spot.id}>
            <BasicCard key={spot.id} {...spot} />
          </div>
        )) : <div className={styles.item1NotFound}>データが見つかりませんでした。</div> }
        <div className={styles.push}></div>
      </div>
      <Footer />
    </>
  )
}