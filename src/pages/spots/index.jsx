import { useRecoilValue } from "recoil";
import { leadSpotsState, locationState, selectedTagsState, spotsState, timeState } from "@/state/atoms";
import { useGetLocation } from "@/hooks/useGetLocation";
import { useFetchSpots } from "@/hooks/useFetchSpots";
import BasicCard from "@/components/BasicCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import styles from "@/styles/SpotsIndex.module.css";
import { useEffect } from "react";
import Layout from "@/components/Layout";


export default function Page() {

  const { getGeolocation } = useGetLocation();
  const { leadLoading, loading, fetchLeadSpots, fetchSpots } = useFetchSpots();

  const location = useRecoilValue(locationState);
  const leadSpots = useRecoilValue(leadSpotsState);
  const spots = useRecoilValue(spotsState);
  const time = useRecoilValue(timeState);
  const selectedTags = useRecoilValue(selectedTagsState);


  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (location.lat !== 0 || location.lng !== 0) {
      fetchLeadSpots();
    };
  }, [location, time, selectedTags]);

  useEffect(() => {
    if (leadSpots.length > 0) {
      fetchSpots();
    }
  }, [leadSpots, time, selectedTags]);


  if (leadLoading) {
    return (
      <>
        <Header />
        <div className={styles.searchTags}>
          <MultiSelectDropdown />
        </div>
        <div className={styles.container}>
          <div className={styles.item1NotFound}>スポットを取得しています。</div>
          <div id={styles.animationContainer}>
            <span></span>
            <span></span>
            <span></span>
            <p>LOADING</p>
          </div>
        </div>
        <Footer />
      </>
    );
  };


  return (
    <>
      <Layout>
        <Header />
        <div className={styles.searchTags}>
          <MultiSelectDropdown />
        </div>
        <div className={styles.container} >
          {leadSpots.length > 0 ? leadSpots.map((spot) => (
            <div className={styles.item1} key={spot.id}>
              <BasicCard key={spot.id} {...spot} />
            </div>
          )) : <div className={styles.item1NotFound}>スポットが見つかりませんでした。</div> }
          { spots.length > 0 && spots.map((spot) => (
            <div className={styles.item1} key={spot.id}>
              <BasicCard key={spot.id} {...spot} />
            </div>
          ))}
          <div className={styles.push}></div>
        </div>
        <Footer />
      </Layout>
    </>
  )
}