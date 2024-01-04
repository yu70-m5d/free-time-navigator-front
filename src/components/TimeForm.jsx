import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { timeState } from "@/state/atoms";
import useFetchSpots from "@/hooks/useFetchSpots";


export default function TimeForm() {

  const { register, handleSubmit } = useForm();
  const setTime = useSetRecoilState(timeState);
  const { loading } = useFetchSpots();


  const handleTime = (data) => {
    setTime(data.time);
  }


  return (
    <>
      <form onSubmit={handleSubmit(handleTime)}>
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
    </>
  )
}