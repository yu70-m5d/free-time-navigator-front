import { useRecoilValue } from "recoil";
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

  const spots = useRecoilValue(spotsState);


  if (!loading) {
    return (
      <>
        <Header />
        <div>現在地を取得しています。</div>
      </>
    );
  };

  return (
    <>
      <Header />
      <MultiSelectDropdown />
      <div className={styles.container} >
        {spots.length ? spots.map((spot) => (
          <div className={styles.item1}>
            <BasicCard key={spot.id} {...spot} />
          </div>
        )) : <div>データが見つかりませんでした。</div> }
      </div>
      <Footer />
    </>
  )
}