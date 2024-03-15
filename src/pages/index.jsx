import Header from "@/components/Header"
import TimeForm from '@/components/TimeForm';
import Footer from '@/components/Footer';
import styles from "@/styles/TopPage.module.css"
import MultiSelectDropdown from '@/components/MultiSelectDropdown';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignIn } from "@/hooks/useSignIn";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { loggedInState } from "@/state/atoms";


export default function Home() {

  const router = useRouter();
  const { userId } = router.query;
  const { signIn } = useSignIn();

  const loggedIn = useRecoilValue(loggedInState);

  useEffect(() => {
    if(userId) {
      const data = {
        userId: userId
      };
      signIn(data);
    }
  }, [router])

  return (
    <>
      <Header />
      <div className={loggedIn ? styles.loggedInContainer : styles.loggedOutContainer }>
        <div className={styles.item1}>
          <div className={styles.item1Item1}>
            <h1 className={styles.item1Item1Head}>Free Time Navigator</h1>
          </div>
          <div className={styles.item1Item2}>
            <h3 className={styles.item1Item2Head}>Welcome!</h3>
            <p className={styles.item1Item2Text}>Free Time Navigatorへようこそ</p>
          </div>
          <div className={styles.item1Item3}>
            <p className={styles.item1Text}>
              空き時間を入力することで<br />
              時間内に行って楽しめるスポットを<br />
              検索するサービスです。<br />
            </p>
          </div>
        </div>
        <div className={styles.item2}>
          <div className={styles.item2Item1Image}>
            <Image src="/images/destination.svg" alt="Destination Image" width={240} height={240} />
          </div>
          <div className={styles.item2Item2}>
            <h2 className={styles.item2Item2Head}>スポットを検索</h2>
          </div>
          <div className={styles.item2Item3}>
            <p className={styles.item2Item3Text}>
              空き時間を入力して検索すれば<br />
              その時間を過ごせるスポットを表示します。
            </p>
          </div>
        </div>
        <div className={styles.item3}>
          <div className={styles.item3Item1Image}>
            <Image src="/images/mobile_login.svg" alt="Mobile Login Image" width={240} height={240} />
          </div>
          <div className={styles.item3Item2}>
            <h2 className={styles.item3Item2Head}>始めよう!</h2>
          </div>
          <div className={styles.item3Item3}>
            <div className={styles.timeFormBox}>
              <p className={styles.timeFormText}>空き時間から検索</p>
              <div className={styles.timeForm}>
                <TimeForm color={"white"} />
              </div>
            </div>
            <p className={styles.orText}>または</p>
            <div className={styles.tagSearchBox}>
              <p className={styles.tagSearchText}>スポットタイプから検索</p>
              <div className={styles.tagSearch}>
                <MultiSelectDropdown />
              </div>
            </div>
          </div>
        </div>
        { loggedIn ? null : (
          <div className={styles.item4}>
            <h3 className={styles.item4Item1}>ログイン・登録はこちらから</h3>
            <Link href={"/auth/signin"} >
              <p className={styles.item4Text}>ログイン</p>
            </Link>
            <Link href={"/auth/signup"} >
              <p className={styles.item4Text}>登録</p>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}