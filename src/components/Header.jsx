import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Drawer } from "@mui/material";
import { useState } from "react";
import DrawerMenu from './DrawerMenu';
import { useForm } from 'react-hook-form';
import { AccessTime } from '@mui/icons-material';


export default function Header() {

  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpened(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpened(false);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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

        <div className='time-form' >
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='time'>
              空き時間
            </label>
            <input
              id="time"
              type="time"
              placeholder='空き時間'
              {...register("time", {
                required: "空き時間を入力してください"
              })}
            />
            <button type="submit">
              検索
            </button>
          </form>
        </div>
      </div>
    </>
  );
}