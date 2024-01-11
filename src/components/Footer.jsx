import MapIcon from '@mui/icons-material/Map';
import styles from "@/styles/Footer.module.css"
import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  const handlePage = () => {
    router.push('/spots');
  }

  return (
    <>
    <div className={styles.footer} onClick={handlePage}>
      <div className={styles.mapIconBox}>
        <MapIcon sx={{height: "40px", width: '40px', color: '#FFFFFF'}} />
      </div>
    </div>
    </>
  );
}