import MapIcon from '@mui/icons-material/Map';
import styles from "@/styles/Footer.module.css"
import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  const handlePage = () => {
    router.push('/spots');
  }

  const isContactPageSpots = router.pathname.includes("/spots");

  return (
    <>
    <div className={styles.footer} onClick={handlePage}>
    { isContactPageSpots ? (
      <div className={styles.mapIconBox}>
        <div className={styles.mapIconOnPage}>
          <MapIcon sx={{height: "40px", width: '40px', marginTop: '4px', color: '#FFFFFF'}} />
        </div>
        <div className={styles.onPageBar}></div>
      </div>
    ) : (
      <div className={styles.mapIconBox}>
        <div className={styles.mapIcon}>
          <MapIcon sx={{height: "40px", width: '40px', marginTop: '4px', color: '#FFFFFF'}} />
        </div>
      </div>
    )}
    </div>
    </>
  );
}