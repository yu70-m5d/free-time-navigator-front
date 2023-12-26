import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";


export default function TimeForm(props) {

  const { onSpotsData, onTimeChange, origin, tags } = props;
  const { register, handleSubmit } = useForm();

  const fetchData = async (data) => {
    try {
      const params = { tags: tags, time: data.time, lat: origin.lat, lng: origin.lng }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FTN_API_SPOTS}`, {
        params: params
      });
      console.log(params);
      onSpotsData(response.data);
      onTimeChange(data.time);
    } catch (error) {
      console.error('データの取得に失敗:', error);
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