import { useRecoilValueLoadable } from "recoil";
import { leadSpotsState, spotsState } from "@/state/atoms";
import useGetLocation from "@/hooks/useGetLocation";
import useFetchSpots from "@/hooks/useFetchSpots";
import BasicCard from "@/components/BasicCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import styles from "@/styles/SpotsIndex.module.css";
import { useEffect } from "react";


export default function Page() {

  useGetLocation();
  const { loading, fetchSpots } = useFetchSpots();
  const spotsLoadable = useRecoilValueLoadable(spotsState);
  const leadSpotsLoadable = useRecoilValueLoadable(leadSpotsState);

  const leadSpots = leadSpotsLoadable.state === 'hasValue' ? leadSpotsLoadable.contents : [];
  const spots = spotsLoadable.state === 'hasValue' ? spotsLoadable.contents : [];

  useEffect(() => {
    if (!loading && leadSpots.length > 0) {
      // ページの初回読み込み時にもfetchSpotsを実行
      fetchSpots();
    }
  }, [loading, leadSpots]);

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.item1NotFound}>スポットを取得しています。</div>
          <div id={styles.animationContainer}>
            <span></span>
            <span></span>
            <span></span>
            <p>LOADING</p>
          </div>
        </div>
      </>
    );
  };

  
  return (
    <>
      <Header />
      <div className={styles.searchTags}>
        <MultiSelectDropdown />
      </div>
      <div className={styles.container} >
        {leadSpots.length ? leadSpots.map((spot) => (
          <div className={styles.item1} key={spot.id}>
            <BasicCard key={spot.id} {...spot} />
          </div>
        )) : <div className={styles.item1NotFound}>データが見つかりませんでした。</div> }
        {spots.map((spot) => (
          <div className={styles.item1} key={spot.id}>
            <BasicCard key={spot.id} {...spot} />
          </div>
        ))}
        <div className={styles.push}></div>
      </div>
      <Footer />
    </>
  )
}