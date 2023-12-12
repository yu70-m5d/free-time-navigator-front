import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";


export default function TimeForm(props) {

  const { onSpotsData, origin } = props;
  const { register, handleSubmit } = useForm();
  const onSubmit = (time) => console.log(time);

  const fetchData = async (time) => {
    try {
      const params = { time: time.time, lat: origin.lat, lng: origin.lng }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FTN_API_INDEX}`, {
        params: params
      });
      console.log(params);
      console.log(response.data);
      onSpotsData(response.data);
    } catch (error) {
      console.error('エラーが発生しました。', error);
      console.log(params);
    }
  };

  return (
    <div className='time-form' >
      <form onSubmit={handleSubmit(fetchData)}>
        <label htmlFor='time'>
          <span className="label">空き時間</span>
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
  )
}