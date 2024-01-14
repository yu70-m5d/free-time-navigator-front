import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Drawer } from "@mui/material";
import { useState } from "react";
import DrawerMenu from './DrawerMenu';
import TimeForm from './TimeForm';
import { useRecoilValue } from 'recoil';
import { locationState } from '@/state/atoms';
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';


export default function Header() {

  const [drawerOpened, setDrawerOpened] = useState(false);

  const router = useRouter();
  const isContactPage = router.pathname.includes("/contact");

  const handleDrawerOpen = () => {
    setDrawerOpened(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpened(false);
  };

  const transitionPage = () => {
    router.push('/')
  };

  if (isContactPage) {
    return (
      <div className={styles.header}>
        <div className={styles.item1TopLink} onClick={transitionPage}>
          <h3 className={styles.topLinkText}>TOP</h3>
        </div>
        <div className={styles.item2}>
          <h3 className={styles.pageTitle}>お問い合わせ</h3>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className={styles.header}>
        <div className={styles.item1} onClick={handleDrawerOpen}>
          <div className={styles.siteName}>
            <span>Free Time Navigator</span>
          </div>
          <div className={styles.menuIcon}>
            <ExpandMoreIcon />
          </div>
        </div>
        <Drawer anchor='top' open={drawerOpened} onClose={handleDrawerClose}>
          <DrawerMenu />
        </Drawer>
        <div className={styles.item3TimeForm}>
          <TimeForm color={'white'} />
        </div>
      </div>
    </>
  );
}