import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Drawer } from "@mui/material";
import { useState } from "react";
import DrawerMenu from './DrawerMenu';
import TimeForm from './TimeForm';
import { useRecoilValue } from 'recoil';
import { locationState } from '@/state/atoms';


export default function Header(props) {

  const { onSpotsData, onTimeChange, tags } = props;
  const origin = useRecoilValue(locationState);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpened(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpened(false);
  };


  return (
    <>
      <div className="header">
        <div className="logo" onClick={handleDrawerOpen}>
          {/* <a>Free Time Navigator</a> */}
          <div className='site-name'>
            <span>Free Time Navigator</span>
          </div>
          <div className='menu-icon'>
            <ExpandMoreIcon />
          </div>
        </div>
        <Drawer anchor='top' open={drawerOpened} onClose={handleDrawerClose}>
          <DrawerMenu />
        </Drawer>
        <div className='time-form'>
          <TimeForm />
        </div>
      </div>
    </>
  );
}