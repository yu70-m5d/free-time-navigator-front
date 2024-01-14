import MapIcon from '@mui/icons-material/Map';
import Header from "@/components/Header"
import TimeForm from '@/components/TimeForm';
import Footer from '@/components/Footer';
import styles from "@/styles/TopPage.module.css"


export default function Home() {

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.item1}>
          <h1 className={styles.headLineSiteName}>Free Time Navigator</h1>
          <h3 className={styles.welcome}>ようこそ！</h3>
          <p className={styles.headLineText}>
            Free Time Navigatorは<br />
            空き時間を入力することで<br />
            時間内に行って楽しめるスポットを<br />
            検索するサービスです。<br />
          </p>
        </div>
        <div className={styles.item2}>
          <div className={styles.contentHead}>
            <div className={styles.spotIconBox}>
              <MapIcon className={styles.icon} sx={{height: 56, width: 56}} />
            </div>
            <h1 className={styles.headLineSearchSpots}>スポットを検索</h1>
          </div>
          <p className={`${styles.text} ${styles.textCenter}`}>
            空き時間を入力して検索すれば<br />
            その時間を過ごせるスポットを表示します。
          </p>
        </div>
        <div className={styles.item3}>
          <h1 className={styles.headLineLetsUse}>使ってみよう!</h1>
          <p className={styles.textCenter}>検索はこちらから</p>
          <div className={styles.timeFormBox}>
            <div className={styles.timeForm}>
              <TimeForm color={"white"} />
            </div>
            <p className={styles.timeFormText}>空き時間を入力してください</p>
          </div>
          <div className={styles.push}></div>
        </div>
      </div>
      <Footer />
    </>
  )
}