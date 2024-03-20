import MapIcon from '@mui/icons-material/Map';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from "@/styles/Footer.module.css"
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '@/state/atoms';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useUser } from '@/hooks/useUser';

export default function Footer() {
  const router = useRouter();
  const isSpotsPage = router.pathname.includes("/spots");
  const isTaskPage = router.pathname.startsWith('/user/task');
  const isUserPage = router.pathname.startsWith('/user/') && !isTaskPage;

  const loggedIn = Boolean(Cookies.get("loggedIn"));

  const { getUserId } = useUser();


  const handleSpotsPage = () => {
    router.push('/spots');
  }

  const handleTaskPage = () => {
    if (!loggedIn) {
      alert("ログインしてください。");
      return
    };
    router.push('/user/task');
  }

  const handleUserPage = async() => {
    if (!loggedIn) {
      alert("ログインしてください。");
      return
    };

    await getUserId();
    const userId = Cookies.get("userId");
    router.push(`/user/${userId}`);
  }


  return (
    <>
      <div className={styles.footer}>
        <div className={styles.mapIconBox} onClick={handleSpotsPage}>
          <MapIcon sx={{height: "40px", width: '40px', marginTop: '4px', color: '#FFFFFF'}} />
          { isSpotsPage && (
            <div className={styles.onPageBar}></div>
          )}
        </div>
        <div className={styles.listIconBox} onClick={handleTaskPage}>
          <FormatListBulletedIcon sx={{height: "40px", width: '40px', marginTop: '4px', color: '#FFFFFF'}} />
          { isTaskPage && (
            <div className={styles.onPageBar}></div>
          )}
        </div>
        <div className={styles.userIconBox} onClick={handleUserPage}>
          <AccountCircleIcon sx={{height: "40px", width: '40px', marginTop: '4px', color: '#FFFFFF'}} />
          { isUserPage && (
            <div className={styles.onPageBar}></div>
          )}
        </div>
      </div>
    </>
  );
}