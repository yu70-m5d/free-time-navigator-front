import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { timeState } from "@/state/atoms";
import { useFetchSpots } from "@/hooks/useFetchSpots";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from '@/styles/TimeForm.module.css'


export default function TimeForm(props) {

  const { color } = props;

  const { setValue } = useForm();
  const [time, setTime] = useRecoilState(timeState);
  const router = useRouter();


  // const handleTime = (data) => {
  //   setTime(data.time);
  //   router.push('/spots');
  // }

  const handleChange = (event) => {
    setTime(event.target.value);
    router.push('/spots');
  }

  useEffect(() => {
    setValue("time", time || "00:00");
  }, [time, setValue]);


  return (
    // <>
    //   <form onSubmit={handleSubmit(handleTime)}>
    //     <input
    //       id="time"
    //       type="time"
    //       list="data-list"
    //       step="1800"
    //       min="00:30"
    //       {...register("time", {
    //         required: "空き時間を入力してください"
    //       })}
    //     />
    //     <datalist id="data-list">
    //       <option value="00:30" />
    //       <option value="01:00" />
    //       <option value="01:30" />
    //       <option value="02:00" />
    //       <option value="02:30" />
    //       <option value="03:00" />
    //     </datalist>
    //     <IconButton type="submit">
    //       <SearchIcon sx={{color: color}} />
    //     </IconButton>
    //   </form>
    // </>
    <>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label" size="small">空き時間</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="time"
          onChange={handleChange}
          sx={{backgroundColor: color}}
        >
          <MenuItem value={""}>none</MenuItem>
          <MenuItem value={"00:30"}>00:30</MenuItem>
          <MenuItem value={"01:00"}>01:00</MenuItem>
          <MenuItem value={"01:30"}>01:30</MenuItem>
          <MenuItem value={"02:00"}>02:00</MenuItem>
          <MenuItem value={"02:30"}>02:30</MenuItem>
          <MenuItem value={"03:00"}>03:00</MenuItem>
          <MenuItem value={"03:30"}>03:30</MenuItem>
          <MenuItem value={"04:00"}>04:00</MenuItem>
          <MenuItem value={"04:30"}>04:30</MenuItem>
          <MenuItem value={"05:00"}>05:00</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}