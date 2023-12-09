import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Drawer } from "@mui/material";
import { useState } from "react";
import DrawerMenu from './DrawerMenu';

export default function Header() {

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
        <div className="logo">
          {/* <a>Free Time Navigator</a> */}
          <div>
            <ExpandMoreIcon onClick={handleDrawerOpen} />
          </div>
        </div>
        <Drawer anchor='top' open={drawerOpened} onClose={handleDrawerClose}>
          <DrawerMenu />
        </Drawer>
      </div>

    </>
  );
}